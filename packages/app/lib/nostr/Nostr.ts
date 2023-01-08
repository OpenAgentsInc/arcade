import { RelayPool } from 'nostr-relaypool'
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
