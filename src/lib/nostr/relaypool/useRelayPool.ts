import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { initialSubscriptions } from 'app/views/chat/initialSubscriptions'
import { useCallback, useEffect } from 'react'
import { useStore } from 'stores'

import { handleEvent } from '../handleEvent'
import { NostrEvent } from '../nip01_events'
import { RelayPool } from './relay-pool'

let relayPoolInstance: RelayPool | null = null

export function useRelayPool(
  relays: string[] = DEFAULT_RELAYS,
  options: { noCache?: boolean } = {}
) {
  const chatActions = useStore().chatActions
  const addEvent = useStore().addEvent
  const activeRelays = useStore((state) => state.relays)

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

  const setupInitialSubscriptions = useCallback(() => {
    if (!relayPoolInstance) {
      console.log('No relaypool, bye.')
      return
    }
    console.log('subscribing maybe')
    const callback = (event: NostrEvent) => {
      console.log('event...')
      handleEvent(event, {
        addChannel: chatActions.addChannel,
        addEvent,
        addMessage: chatActions.addMessage,
      })
    }
    const sub = relayPoolInstance.subscribe(
      initialSubscriptions,
      relays,
      callback
    )
    return sub
  }, [relayPoolInstance])

  return {
    relays: activeRelays,
    relayPool: relayPoolInstance,
    setupInitialSubscriptions,
  }
}
