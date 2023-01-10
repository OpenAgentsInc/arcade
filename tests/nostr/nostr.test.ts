import 'websocket-polyfill'

import { delay } from 'app/lib/utils'
import { Nostr, NostrEvent } from 'lib/nostr'
import { RelayPoolSubscription } from 'nostr-relaypool'
import {
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools'

describe('Nostr class', () => {
  let nostr: Nostr
  let sub: RelayPoolSubscription
  beforeEach(async () => {
    nostr = new Nostr(
      '22a12a128a3be27cd7fb250cbe796e692896398dc1440ae3fa567812c8107c1c',
      '5c6c25b7ef18d8633e97512159954e1aa22809c6b763e94b9f91071836d00217'
    )
    await delay(500)
  })

  afterEach(async () => {
    if (sub) {
      sub.unsub()
    }
    await delay(500)
    nostr.close()
  })

  test('initial subscriptions', async () => {
    sub = nostr.setupInitialSubscriptions()
    expect(sub).toBeDefined()
  })

  test('publish event', () => {
    const event: NostrEvent = {
      kind: 1,
      pubkey: nostr.publicKey,
      created_at: Date.now(),
      tags: [],
      content: 'hello world',
    }
    const pub = nostr.publish(event)
    expect(pub).toBeTruthy()
    // additional assertions to check if the event has been published correctly
  })

  test('set keys', () => {
    const publicKey =
      '22a12a128a3be27cd7fb250cbe796e692896398dc1440ae3fa567812c8107c1c'
    const privateKey =
      '5c6c25b7ef18d8633e97512159954e1aa22809c6b763e94b9f91071836d00217'
    nostr.setKeys(publicKey, privateKey)
    expect(nostr.publicKey).toEqual(publicKey)
    expect(nostr.privateKey).toEqual(privateKey)
  })

  test('listening (twice) and publishing via pool', async () => {
    const sk = generatePrivateKey()
    const pk = getPublicKey(sk)
    let resolve1
    let resolve2

    const relayPoolSubscription = nostr.subscribe([
      {
        kinds: [27572],
        authors: [pk],
      },
    ])

    relayPoolSubscription.onevent((event) => {
      expect(event).toHaveProperty('pubkey', pk)
      expect(event).toHaveProperty('kind', 27572)
      expect(event).toHaveProperty('content', 'arc test suite')
      resolve1(true)
    })
    relayPoolSubscription.onevent((event) => {
      expect(event).toHaveProperty('pubkey', pk)
      expect(event).toHaveProperty('kind', 27572)
      expect(event).toHaveProperty('content', 'arc test suite')
      resolve2(true)
    })

    const event: NostrEvent = {
      kind: 27572,
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: 'arc test suite',
    }
    event.id = getEventHash(event)
    event.sig = signEvent(event, sk)

    nostr.publish(event)

    return expect(
      Promise.all([
        new Promise((resolve) => {
          resolve1 = resolve
        }),
        new Promise((resolve) => {
          resolve2 = resolve
        }),
      ])
    ).resolves.toEqual([true, true])
  })
})
