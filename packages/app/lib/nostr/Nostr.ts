import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'
import { useStore } from 'app/stores'
import { RelayPool } from 'nostr-relaypool'
import { Event as NostrEvent } from 'nostr-tools'
import { handleEvent } from '../handleEvent'
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
    setTimeout(() => {
      console.log('Setting up initial subscriptions...')
      this.setupInitialSubscriptions()
    }, 2500)
  }

  private setupInitialSubscriptions() {
    const sub = this.relayPool.sub(initialSubscriptions, this.relays)
    const chatActions = useStore.getState().chatActions
    sub.onevent((event: NostrEvent) => {
      console.log('Event received', event.id)
      handleEvent(event, {
        addChannel: chatActions.addChannel,
        addMessage: chatActions.addMessage,
      })
    })
    console.log('Subscriptions done.')
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
