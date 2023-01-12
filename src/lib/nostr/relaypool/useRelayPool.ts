import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useDatabase } from 'lib/database'
import { useCallback, useEffect } from 'react'
import { useStore } from 'stores'
import { initialSubscriptions } from 'views/chat/initialSubscriptions'

import { handleEvent } from '../handleEvent'
import { NostrEvent } from '../nip01_events'
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
  const connectedRelays = activeRelays.filter((relay) => relay.connected)
  const db = useDatabase()

  useEffect(() => {
    if (!relayPoolInstance) {
      relayPoolInstance = new RelayPool(relays, options)
      relayPoolInstance.onnotice = (notice) => {
        console.log('notice:', notice)
      }
    }

    return () => {
      relayPoolInstance?.close()
      relayPoolInstance = null
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
    if (!relayPoolInstance) {
      console.log('No relaypool, bye.')
      return
    }
    console.log('subscribing maybe')
    const callback = (event: NostrEvent) => {
      handleEvent(event, db)
    }
    const sub = relayPoolInstance.subscribe(
      initialSubscriptions,
      relays,
      callback
    )
    return sub
  }, [relayPoolInstance])

  // If connectNow is true, setup initial subscriptions
  useEffect(() => {
    if (options.connectNow) {
      setupInitialSubscriptions()
    }
  }, [options.connectNow, setupInitialSubscriptions])

  return {
    connectedRelays,
    relays: activeRelays,
    relayPool: relayPoolInstance,
    setupInitialSubscriptions,
  }
}
