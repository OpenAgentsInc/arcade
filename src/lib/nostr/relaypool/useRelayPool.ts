import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useDatabase } from 'lib/database'
import { useCallback, useEffect, useMemo } from 'react'
import { useStore } from 'stores'

import { handleEvent } from '../handleEvent'
import { NostrEvent } from '../nip01_events'
import { createInitialSubscriptions } from './createInitialSubscriptions'
import { RelayPool } from './relay-pool'

export let relayPoolInstance: RelayPool | null = null
let subscribed: boolean = false

export function useRelayPool({
  relays: relaysToConnectTo = DEFAULT_RELAYS,
  noCache = true,
  connectNow = false,
}: {
  connectNow?: boolean
  noCache?: boolean
  relays?: string[]
} = {}) {
  const relays = useStore((state) => state.relays)
  const connectedRelays = useMemo(
    () => relays.filter((relay) => relay.connected),
    [relays]
  )
  const db = useDatabase()
  const set = useStore.setState

  useEffect(() => {
    if (!relayPoolInstance) {
      relayPoolInstance = new RelayPool(relaysToConnectTo, { noCache })
      console.log('We set up a new relay pool instance.')
      relayPoolInstance.onnotice = (notice) => {
        console.log('notice:', notice)
      }
    }

    return () => {
      console.log('Closing relayPoolInstance.')
      relayPoolInstance?.close()
      relayPoolInstance = null
    }
  }, [])

  const setupInitialSubscriptions = useCallback(async () => {
    const pubkey = useStore.getState().user.publicKey
    if (!pubkey) {
      console.log('Subs: No pubkey, bye.')
      return
    }
    const friends = useStore.getState().friends
    const subscriptions = await createInitialSubscriptions(pubkey, friends)
    const relayInfo = useStore.getState().relays
    if (!relayPoolInstance) {
      console.log('Subs: No relaypool, bye.')
      return
    }
    if (subscribed) {
      console.log('Subs: Already subscribed, bye.')
      return
    }
    const relays = relayInfo.map((relay) => relay.url)
    const callback = (event: NostrEvent) => {
      handleEvent(event, db, { set })
    }

    console.log("Subs: We're subscribing now...", relays.length)
    const sub = relayPoolInstance.subscribe(subscriptions, relays, callback)
    subscribed = true
    return sub
  }, [])

  // If connectNow is true, setup initial subscriptions
  useEffect(() => {
    if (connectNow) {
      setTimeout(() => {
        setupInitialSubscriptions()
      }, 800)
    }
  }, [connectNow])

  return {
    relays,
    relayPool: relayPoolInstance,
    connectedRelays,
  }
}
