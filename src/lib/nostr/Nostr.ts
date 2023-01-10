import { Event as NostrEvent, Filter, handleEvent } from 'lib/nostr'
import { RelayPool, RelayPoolSubscription } from 'nostr-relaypool'
import { useStore } from 'stores'
import { initialSubscriptions } from 'views/chat/initialSubscriptions'

const DEFAULT_RELAYS = ['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co']

export class Nostr {
  private relayPool: RelayPool
  private relays: string[]
  public publicKey: string | undefined
  public privateKey: string | undefined

  constructor(relays: string[] = DEFAULT_RELAYS) {
    this.relays = relays
    this.relayPool = new RelayPool(this.relays)
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

  public publish(event: NostrEvent): void {
    this.relayPool.publish(event, this.relays)
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
    if (!this.relayPool) {
      return
    }
    this.relayPool.close()
  }
}
