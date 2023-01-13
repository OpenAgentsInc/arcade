import { useStore } from 'stores'

import { db } from '../database'
import { handleEvent } from './handleEvent'
// eslint-disable-next-line import/order
import { NostrEvent } from './NostrEvent'
import { relayPoolInstance } from './relaypool'

export const getFriendMetadata = async (): Promise<NostrEvent[]> => {
  const relays = useStore.getState().relays
  const events: NostrEvent[] = []
  const pubkeys = useStore.getState().friends

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
