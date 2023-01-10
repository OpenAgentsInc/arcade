import {
  Event as NostrEvent,
  Filter,
  handleEvent,
  validateEvent,
} from 'lib/nostr'
import { RelayPool, RelayPoolSubscription } from 'nostr-relaypool'
import { getEventHash, signEvent } from 'nostr-tools'
import { useStore } from 'stores'
import { initialSubscriptions } from 'views/chat/initialSubscriptions'

const DEFAULT_RELAYS = ['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co']

export class Nostr {
  private relayPool: RelayPool
  private relays: string[]
  public publicKey: string
  public privateKey: string

  constructor(
    publicKey: string,
    privateKey: string,
    relays: string[] = DEFAULT_RELAYS
  ) {
    this.relays = relays
    this.relayPool = new RelayPool(this.relays)
    this.publicKey = publicKey
    this.privateKey = privateKey
  }

  public setupInitialSubscriptions() {
    const sub = this.relayPool.sub(initialSubscriptions, this.relays)
    const chatActions = useStore.getState().chatActions
    sub.onevent((event: NostrEvent) => {
      handleEvent(event, {
        addChannel: chatActions.addChannel,
        addMessage: chatActions.addMessage,
      })
    })
    return sub
  }

  public publish(event: NostrEvent): boolean {
    console.log('EVENTSOFAR:', event)
    try {
      if (!event.id) {
        event.id = getEventHash(event)
        console.log('we made an event', event)
      }
      if (!event.sig) {
        if (!this.privateKey) {
          throw new Error('Cannot sign event, private key not set')
        }
        event.sig = signEvent(event, this.privateKey)
      }
      if (!validateEvent(event)) {
        throw new Error('Invalid event')
      }
      this.relayPool.publish(event, this.relays)
      return true
    } catch (e) {
      return false
    }
  }

  public setKeys(publicKey: string, privateKey: string): void {
    this.publicKey = publicKey
    this.privateKey = privateKey
    console.log(`Nostr keys set. pub: ${publicKey}`)
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
    const chatActions = useStore.getState().chatActions
    sub.onevent((event: NostrEvent) => {
      handleEvent(event, {
        addChannel: chatActions.addChannel,
        addMessage: chatActions.addMessage,
      })
    })
    return sub
  }

  public close(): void {
    this.relayPool.close()
  }
}
