import { RelayPool, RelayPoolSubscription } from 'nostr-relaypool'
import {
  Event,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools'
import { useStore } from 'stores'

import { DEFAULT_RELAYS } from '../constants/relays'
import { handleEvent } from './handleEvent'
import { Filter, Kind, NostrEvent, validateEvent } from './nip01_events'

export class Nostr {
  private relayPool: RelayPool
  private relays: string[]
  public publicKey: string
  public privateKey: string

  constructor(
    publicKey: string | undefined = undefined,
    privateKey: string | undefined = undefined,
    relays: string[] = DEFAULT_RELAYS
  ) {
    this.relays = relays
    this.relayPool = new RelayPool(this.relays)
    this.privateKey = privateKey ?? generatePrivateKey()
    this.publicKey = publicKey ?? getPublicKey(this.privateKey)
  }

  public getFriendList(): string[] {
    return useStore.getState().friends
  }

  public publish(event: NostrEvent): boolean {
    try {
      if (!event.id) {
        event.id = getEventHash(event as Event)
      }
      if (!event.sig) {
        if (!this.privateKey) {
          throw new Error('Cannot sign event, private key not set')
        }
        event.sig = signEvent(event as Event, this.privateKey)
      }
      if (!validateEvent(event)) {
        throw new Error('Invalid event')
      }
      this.relayPool.publish(event as Event, this.relays)
      return true
    } catch (e: any) {
      console.log(e)
      return false
    }
  }

  public setKeys(publicKey: string, privateKey: string): void {
    this.publicKey = publicKey
    this.privateKey = privateKey
  }

  public subscribeToChannel(channelId: string): RelayPoolSubscription {
    return this.subscribe([
      {
        kinds: [42],
        limit: 30,
        '#e': [channelId],
      },
    ])
  }

  public subscribe(filters: Filter[]): RelayPoolSubscription {
    const sub = this.relayPool.sub(filters, this.relays)
    sub.onevent((event: NostrEvent) => {
      handleEvent(event)
    })
    return sub
  }

  public close(): void {
    try {
      this.relayPool.close()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {}
  }
}
