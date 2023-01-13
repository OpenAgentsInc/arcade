import { useStore } from 'stores'

import { db } from '../database'
import { NostrEvent } from './NostrEvent'
import { handleEvent } from './handleEvent'
import { relayPoolInstance } from './relaypool'

export const getFriendMetadata = async (
  pubkeys: string[],
  onError = (relay) => {
    console.log('error', relay)
  }
): Promise<NostrEvent[]> => {
  const relays = useStore.getState().relays
  const events: NostrEvent[] = []

  return new Promise((resolve) => {
    relays.forEach((relayInfo) => {
      const relay = relayPoolInstance?.relayByUrl.get(relayInfo.url)
      if (!relay) return
      const sub = relay.sub([{ authors: pubkeys, kinds: [0] }])

      sub.on('event', (event) => {
        if (event.kind === 0) {
          console.log(`Got kind0 for ${event.pubkey}!`)
          handleEvent(event, db)
          events.push(event)
        }
      })

      sub.on('eose', () => {
        resolve(events)
        sub.unsub()
      })
    })
  })
}
