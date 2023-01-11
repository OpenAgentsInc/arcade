import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { initialSubscriptions } from 'app/views/chat/initialSubscriptions'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'stores'

import { handleEvent } from '../handleEvent'
import { NostrEvent } from '../nip01_events'
import { RelayPool } from './relay-pool'

export function useRelayPool(
  relays: string[] = DEFAULT_RELAYS,
  options: { noCache?: boolean } = {}
) {
  const [relayPool, setRelayPool] = useState<RelayPool | null>(null)
  const chatActions = useStore().chatActions
  const addEvent = useStore().addEvent
  const activeRelays = useStore((state) => state.relays)

  useEffect(() => {
    const newRelayPool = new RelayPool(relays, options)
    newRelayPool.onnotice = (notice) => {
      console.log('notice:', notice)
    }
    setRelayPool(newRelayPool)
    console.log('relaypool set maybe.')
    return () => {
      newRelayPool.close()
      setRelayPool(null)
      console.log('relaypool notset')
    }
  }, [relays])

  const setupInitialSubscriptions = useCallback(() => {
    if (!relayPool) {
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
    const sub = relayPool.subscribe(initialSubscriptions, relays, callback)
    return sub
  }, [relayPool])

  return {
    relays: activeRelays,
    relayPool,
    setupInitialSubscriptions,
  }
}
