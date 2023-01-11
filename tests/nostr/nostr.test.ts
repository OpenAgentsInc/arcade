import 'websocket-polyfill'

import { delay } from 'app/lib/utils'
import { Nostr, NostrEvent } from 'lib/nostr'
import { RelayPoolSubscription } from 'nostr-relaypool'
import {
  Event,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools'

describe('Nostr class', () => {
  let nostr: Nostr
  let sub: RelayPoolSubscription
  beforeAll(() => {
    nostr = new Nostr(
      '22a12a128a3be27cd7fb250cbe796e692896398dc1440ae3fa567812c8107c1c',
      '5c6c25b7ef18d8633e97512159954e1aa22809c6b763e94b9f91071836d00217'
    )
  })

  afterAll(async () => {
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

  test('publish event', async () => {
    const sk = generatePrivateKey()
    const pk = getPublicKey(sk)
    const event: NostrEvent = {
      kind: 1,
      pubkey: pk,
      created_at: Date.now(),
      tags: [],
      content: 'hello world',
    }
    event.id = getEventHash(event as Event)
    event.sig = signEvent(event as Event, sk)

    const pub = nostr.publish(event)
    expect(pub).toBeTruthy()
  })

  test('set keys', () => {
    const privateKey = generatePrivateKey()
    const publicKey = getPublicKey(privateKey)

    generatePrivateKey()
    nostr.setKeys(publicKey, privateKey)
    expect(nostr.publicKey).toEqual(publicKey)
    expect(nostr.privateKey).toEqual(privateKey)
  })

  test('listening (twice) and publishing via pool', async () => {
    const sk = generatePrivateKey()
    const pk = getPublicKey(sk)
    const eventContent = 'arc test suite'
    const eventKind = 27572
    const promises: Promise<any>[] = []

    promises.push(
      new Promise((resolve) => {
        const relayPoolSubscription = nostr.subscribe([
          {
            kinds: [eventKind],
            authors: [pk],
          },
        ])
        relayPoolSubscription.onevent((event) => {
          expect(event).toHaveProperty('pubkey', pk)
          expect(event).toHaveProperty('kind', eventKind)
          expect(event).toHaveProperty('content', eventContent)
          relayPoolSubscription.unsub() // unsubscribe when event is received
          resolve(true)
        })
      })
    )

    promises.push(
      new Promise((resolve) => {
        const relayPoolSubscription = nostr.subscribe([
          {
            kinds: [eventKind],
            authors: [pk],
          },
        ])
        relayPoolSubscription.onevent((event) => {
          expect(event).toHaveProperty('pubkey', pk)
          expect(event).toHaveProperty('kind', eventKind)
          expect(event).toHaveProperty('content', eventContent)
          relayPoolSubscription.unsub() // unsubscribe when event is received
          resolve(true)
        })
      })
    )

    const event: NostrEvent = {
      kind: eventKind,
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: eventContent,
    }
    event.id = getEventHash(event as Event)
    event.sig = signEvent(event as Event, sk)

    nostr.publish(event)

    return expect(Promise.all(promises)).resolves.toEqual([true, true])
  })
})
