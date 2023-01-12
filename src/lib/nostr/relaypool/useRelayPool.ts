import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useDatabase } from 'lib/database'
import { useInterval } from 'lib/hooks/useInterval'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStore } from 'stores'

import { handleEvent } from '../handleEvent'
import { Filter, Kind, NostrEvent } from '../nip01_events'
import { createInitialSubscriptions } from './createInitialSubscriptions'
import { RelayPool } from './relay-pool'

let relayPoolInstance: RelayPool | null = null
let subscribed: boolean = false

export function useRelayPool({
  relays: relaysToConnectTo = DEFAULT_RELAYS,
  ...options
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
  const pubkey = useStore((state) => state.user.publicKey)
  const friends = useStore((state) => state.friends)
  const subscriptions = useMemo(
    () => createInitialSubscriptions(pubkey, friends),
    [pubkey, friends]
  )

  useEffect(() => {
    if (!relayPoolInstance) return

    relays.forEach((relay) => {
      if (!relayPoolInstance?.relayByUrl.has(relay.url)) {
        console.log(`Adding relay ${relay.url} to pool.`)
        relayPoolInstance?.addOrGetRelay(relay.url)
      }
    })
  }, [relays, relayPoolInstance])

  useEffect(() => {
    if (!relayPoolInstance) {
      relayPoolInstance = new RelayPool(relaysToConnectTo, options)
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

  const setupInitialSubscriptions = useCallback(() => {
    const pubkey = useStore.getState().user.publicKey
    console.log('Trying with pubkey...', pubkey)
    if (!pubkey) {
      console.log('Subs: No pubkey, bye.')
      return
    }
    const friends = useStore.getState().friends
    const subscriptions = createInitialSubscriptions(pubkey, friends)
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
      handleEvent(event, db)
    }

    console.log("Subs: We're subscribing now...", relays.length)
    const sub = relayPoolInstance.subscribe(subscriptions, relays, callback)
    subscribed = true
    return sub
  }, []) // relayPoolInstance, pubkey, subscriptions, connectedRelays

  // If connectNow is true, setup initial subscriptions
  useEffect(() => {
    if (options.connectNow) {
      setTimeout(() => {
        setupInitialSubscriptions()
      }, 3000)
    }
  }, [options.connectNow])

  return {
    relays,
    relayPool: relayPoolInstance,
    connectedRelays,
    subscriptions,
  }

  //   const relays = useStore((state) => state.relays)
  //   const connectedRelays = useStore((state) => state.connectedRelays)
  //   const relayActions = useStore((state) => state.relayActions)

  //   //   const connectedRelays = useMemo(
  //   //     () => activeRelays.filter((relay) => relay.connected),
  //   //     [activeRelays]
  //   //   )
  //   const db = useDatabase()
  //   const pubkey = useStore((state) => state.user.publicKey)
  //   const friends = useStore((state) => state.friends)
  //   const subscriptions = useMemo(
  //     () => createInitialSubscriptions(pubkey, friends),
  //     [pubkey, friends]
  //   )
  //   useEffect(() => {
  //     console.log('Subscriptions:', subscriptions)
  //   }, [subscriptions])

  //   useEffect(() => {
  //     console.log('Relays:', activeRelays.length)
  //   }, [activeRelays])

  //   useEffect(() => {
  //     console.log('Connected relays:', connectedRelays.length)
  //   }, [connectedRelays])

  //   useEffect(() => {
  //     if (!relayPoolInstance) {
  //       relayPoolInstance = new RelayPool(relays, options)
  //       console.log('We set up a new relay pool instance.')
  //       relayPoolInstance.onnotice = (notice) => {
  //         console.log('notice:', notice)
  //       }
  //     }

  //     return () => {
  //       //   console.log('NOT closing the relaypoolinstance...')
  //       console.log('Closing relayPoolInstance.')
  //       relayPoolInstance?.close()
  //       relayPoolInstance = null
  //     }
  //   }, [])

  // useEffect(() => {
  //   if (!relayPoolInstance) return

  //   activeRelays.forEach((relay) => {
  //     if (!relayPoolInstance?.relayByUrl.has(relay.url)) {
  //       console.log(`Adding relay ${relay.url} to pool.`)
  //       relayPoolInstance?.addOrGetRelay(relay.url)
  //     }
  //   })
  // }, [activeRelays, relayPoolInstance])

  //   const setupInitialSubscriptions = useCallback(() => {
  //     if (!pubkey) {
  //       return
  //     }
  //     if (!relayPoolInstance) {
  //       console.log('No relaypool, bye.')
  //       return
  //     }
  //     const callback = (event: NostrEvent) => {
  //       handleEvent(event, db)
  //     }
  //     console.log('SUBSCRIBING...')
  //     const sub = relayPoolInstance.subscribe(subscriptions, relays, callback)
  //     return sub
  //   }, [relayPoolInstance, pubkey]) // , connectedRelays

  //   // If connectNow is true, setup initial subscriptions
  //   useEffect(() => {
  //     if (options.connectNow) {
  //       setTimeout(() => {
  //         setupInitialSubscriptions()
  //       }, 3000)
  //     }
  //   }, [options.connectNow, setupInitialSubscriptions])

  //   return {
  //     connectedRelays,
  //     relays: activeRelays,
  //     relayPool: relayPoolInstance,
  //     setupInitialSubscriptions,
  //   }
}
