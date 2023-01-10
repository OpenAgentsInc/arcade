import {
  Event as NostrEvent,
  Filter,
  handleEvent,
  Kind,
  validateEvent,
} from 'lib/nostr'
import { RelayPool, RelayPoolSubscription } from 'nostr-relaypool'
import {
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools'
import { useState } from 'react'
import { useStore } from 'stores'
import { initialSubscriptions } from 'views/chat/initialSubscriptions'

const DEFAULT_RELAYS = ['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co']

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

  public loadFirstPaint() {
    // Grab friendlist and add self to it
    const friends = this.getFriendList()
    friends.push(this.publicKey)

    // We want contact metadata of all these folks
    const contactsFilter: Filter = { kinds: [0], authors: friends }

    // We want our contact list
    const ourContactsFilter: Filter = {
      kinds: [Kind.Contacts, Kind.Metadata],
      authors: [this.publicKey],
    }

    // We want our DMs
    const dmsFilter: Filter = {
      kinds: [Kind.EncryptedDirectMessage],
      limit: 500,
      authors: [this.publicKey],
    }

    // We want our DMs (?)
    // const ourDmsFilter: Filter = {
    //   kinds: [Kind.EncryptedDirectMessage],
    //   authors: friends,
    // }

    const homeFilter: Filter = {
      kinds: [Kind.Text, Kind.ChannelMessage, Kind.Repost, Kind.Reaction],
      authors: friends,
      limit: 500,
    }

    return true
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
    try {
      if (!event.id) {
        event.id = getEventHash(event)
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
    // const chatActions = useStore.getState().chatActions
    // sub.onevent((event: NostrEvent) => {
    //   handleEvent(event, {
    //     addChannel: chatActions.addChannel,
    //     addMessage: chatActions.addMessage,
    //   })
    // })
    return sub
  }

  public close(): void {
    try {
      this.relayPool.close()
    } catch (e: any) {}
  }
}
