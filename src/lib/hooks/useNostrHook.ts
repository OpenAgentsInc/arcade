import {
  Event as NostrEvent,
  Filter,
  handleEvent,
  Kind,
  validateEvent,
} from 'lib/nostr'
import { RelayPool, RelayPoolSubscription } from 'nostr-relaypool'
import {
  Event,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools'
import { useEffect, useState } from 'react'
import { useStore } from 'stores'
import { initialSubscriptions } from 'views/chat/initialSubscriptions'

import { DEFAULT_RELAYS } from '../constants/relays'

export function useNostr(
  publicKey: string | undefined = undefined,
  privateKey: string | undefined = undefined,
  relays: string[] = DEFAULT_RELAYS
) {
  const [relayPool, setRelayPool] = useState(new RelayPool(relays))
  const [subscription, setSubscription] =
    useState<RelayPoolSubscription | null>(null)

  const [privateKeyState, setPrivateKey] = useState(
    privateKey ?? generatePrivateKey()
  )
  const [publicKeyState, setPublicKey] = useState(
    publicKey ?? getPublicKey(privateKeyState)
  )

  useEffect(() => {
    setRelayPool(new RelayPool(relays))
  }, [relays])

  const [friendList, setFriendList] = useState<any>([])

  //   useEffect(() => {
  //     setFriendList(getFriendList())
  //   }, [getFriendList])

  //   function getFriendList(): string[] {
  //     return useStore.getState().friends
  //   }

  function loadFirstPaint() {
    // Grab friendlist and add self to it
    const friends = friendList
    console.log('friends:', friends)
    friends.push(publicKeyState)

    // We want contact metadata of our friends
    const contactsFilters: Filter[] = [{ kinds: [0], authors: friends }]

    // We want our contact list
    const ourContactsFilters: Filter[] = [
      {
        kinds: [Kind.Contacts, Kind.Metadata],
        authors: [publicKeyState],
      },
    ]

    // We want our DMs
    const dmsFilters: Filter[] = [
      {
        kinds: [Kind.EncryptedDirectMessage],
        limit: 500,
        authors: [publicKeyState],
      },
    ]

    const homeFilters: Filter[] = [
      {
        kinds: [Kind.Text, Kind.ChannelMessage, Kind.Repost, Kind.Reaction],
        authors: friends,
        limit: 100,
        // limit: 500,
      },
    ]

    // TODO add support for throwing these to specific relay
    subscribe(contactsFilters)
    subscribe(ourContactsFilters)
    subscribe(dmsFilters)
    subscribe(homeFilters)

    return true
  }

  function setupInitialSubscriptions() {
    const sub = relayPool.sub(initialSubscriptions, relays)
    const chatActions = useStore.getState().chatActions
    const addEvent = useStore.getState().addEvent
    sub.onevent((event: NostrEvent) => {
      handleEvent(event, {
        addChannel: chatActions.addChannel,
        addEvent,
        addMessage: chatActions.addMessage,
      })
    })
    setSubscription(sub)
    return sub
  }

  function subscribe(filters: Filter[]) {
    relayPool.sub(filters, relays)
  }

  function publish(event: NostrEvent): boolean {
    try {
      if (!event.id) {
        event.id = getEventHash(event as Event)
      }
      if (!event.sig) {
        if (!privateKeyState) {
          throw new Error('Cannot sign event, private key not set')
        }
        event.sig = signEvent(event as Event, privateKeyState)
      }
      if (!validateEvent(event)) {
        throw new Error('Invalid event')
      }
      relayPool.publish(event as Event, relays)
      return true
    } catch (e: any) {
      console.log(e)
      return false
    }
  }

  function setKeys(publicKey: string, privateKey: string) {
    setPublicKey(publicKey)
    setPrivateKey(privateKey)
  }

  return {
    loadFirstPaint,
    setupInitialSubscriptions,
    subscribe,
    publish,
    setKeys,
    publicKey: publicKeyState,
    privateKey: privateKeyState,
    relayPool,
    subscription,
  }
}
