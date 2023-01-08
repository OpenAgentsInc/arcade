import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'
import { RelayPool } from 'nostr-relaypool'
import { Event as NostrEvent } from 'nostr-tools'
import { Event } from './Event'

const DEFAULT_RELAYS = ['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co']

export class Nostr {
  private relayPool: RelayPool
  private relays: string[]
  private publicKey: string
  private privateKey: string

  constructor(relays: string[] = DEFAULT_RELAYS) {
    this.relays = relays
    this.relayPool = new RelayPool(relays)
    console.log('RelayPool initialized.')

    const sub = this.relayPool.sub(initialSubscriptions, this.relays)
    sub.onevent((event: NostrEvent) => {
      console.log('Event received', event.id)
    })
    console.log('Subscriptions done.')

    // Subscribe to the initial batch of Nostr events
    // initialSubscriptions.forEach((subscription) => {
    //   this.relayPool.sub(subscription, this.relays)
    // })
  }

  public publish(event: Event): void {
    this.relayPool.publish(event, this.relays)
  }

  public setKeys(publicKey: string, privateKey: string): void {
    this.publicKey = publicKey
    this.privateKey = privateKey
    console.log(`Nostr keys set. pub: ${publicKey}`)
  }
}
