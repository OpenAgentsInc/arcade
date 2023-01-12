import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useDatabase } from 'lib/database'
import { useInterval } from 'lib/hooks/useInterval'
import { useCallback, useEffect, useMemo } from 'react'
import { useStore } from 'stores'
import { initialSubscriptions } from 'views/chat/initialSubscriptions'

import { handleEvent } from '../handleEvent'
import { Filter, Kind, NostrEvent } from '../nip01_events'
import { RelayPool } from './relay-pool'

let relayPoolInstance: RelayPool | null = null

export function useRelayPool({
  relays = DEFAULT_RELAYS,
  ...options
}: {
  connectNow?: boolean
  noCache?: boolean
  relays?: string[]
} = {}) {
  const activeRelays = useStore((state) => state.relays)

  const connectedRelays = useMemo(() => {
    return activeRelays.filter((relay) => relay.connected)
  }, [activeRelays])
  console.log('activeRelays', activeRelays)
  console.log('connectedRelays', connectedRelays)
  const db = useDatabase()
  const pubkey = useStore((state) => state.user.publicKey)
  const friends = useStore((state) => state.friends)

  const createInitialSubscriptions = (userPubkey: string) => {
    console.log(`Creating initial subscriptions for ${userPubkey}.`)
    const subscriptions = [...initialSubscriptions]

    friends.push(userPubkey)

    const contactsFilters: Filter[] = [
      { kinds: [Kind.Metadata], authors: friends },
    ]
    subscriptions.push(...contactsFilters)

    const ourContactsFilters: Filter[] = [
      { kinds: [Kind.Contacts, Kind.Metadata], authors: [userPubkey] },
    ]
    subscriptions.push(...ourContactsFilters)

    const dmsFilters: Filter[] = [
      {
        kinds: [Kind.EncryptedDirectMessage],
        limit: 500,
        authors: [userPubkey],
      },
    ]
    subscriptions.push(...dmsFilters)

    const homeFilters: Filter[] = [
      {
        kinds: [Kind.Text, Kind.ChannelMessage, Kind.Repost, Kind.Reaction],
        authors: friends,
        limit: 10,
      },
    ]
    subscriptions.push(...homeFilters)

    return subscriptions
  }

  useEffect(() => {
    if (!relayPoolInstance) {
      relayPoolInstance = new RelayPool(relays, options)
      console.log('We set up a new relay pool instance.')
      relayPoolInstance.onnotice = (notice) => {
        console.log('notice:', notice)
      }
    }

    return () => {
      console.log('NOT closing the relaypoolinstance...')
      //   relayPoolInstance?.close()
      //   relayPoolInstance = null
    }
  }, [])

  useEffect(() => {
    if (!relayPoolInstance) return

    activeRelays.forEach((relay) => {
      if (!relayPoolInstance?.relayByUrl.has(relay.url)) {
        console.log(`Adding relay ${relay.url} to pool.`)
        relayPoolInstance?.addOrGetRelay(relay.url)
      }
    })
  }, [activeRelays, relayPoolInstance])

  const setupInitialSubscriptions = useCallback(() => {
    console.log(`Connected relays: ${connectedRelays.length}`)
    // if (connectedRelays.length < 9) {
    //   console.log('bye')
    //   return
    // }
    if (!pubkey) {
      return
    }
    if (!relayPoolInstance) {
      console.log('No relaypool, bye.')
      return
    }
    const callback = (event: NostrEvent) => {
      handleEvent(event, db)
    }
    console.log('SUBSCRIBING...')
    const sub = relayPoolInstance.subscribe(
      createInitialSubscriptions(pubkey),
      relays,
      callback
    )
    return sub
  }, [relayPoolInstance, pubkey, connectedRelays])

  // If connectNow is true, setup initial subscriptions
  useEffect(() => {
    if (options.connectNow) {
      setTimeout(() => {
        setupInitialSubscriptions()
      }, 3000)
    }
  }, [options.connectNow, setupInitialSubscriptions, connectedRelays])

  return {
    connectedRelays,
    relays: activeRelays,
    relayPool: relayPoolInstance,
    setupInitialSubscriptions,
  }
}
