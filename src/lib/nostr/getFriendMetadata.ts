import { useStore } from 'stores'

import { db } from '../database'
import { handleEvent } from './handleEvent'
// eslint-disable-next-line import/order
import { NostrEvent } from './NostrEvent'
import { relayPoolInstance } from './relaypool'

let done = false

export const getFriendMetadata = async () => {
  if (done) return
  done = true
  const relays = useStore.getState().relays
  const events: NostrEvent[] = []
  const pubkeys = useStore.getState().friends

  relays.forEach((relayInfo) => {
    const relay = relayPoolInstance?.relayByUrl.get(relayInfo.url)
    if (!relay) return
    const sub = relay.sub([{ authors: pubkeys, kinds: [0] }])

    sub.on('event', (event) => {
      if (event.kind === 0) {
        // console.log('skip saving kind0')
        console.log(`Got kind0 for ${event.pubkey}!`)
        try {
          handleEvent(event)
          events.push(event)
        } catch (e) {
          console.log('error handling event', e)
        }
      }
    })

    sub.on('eose', () => {
      // resolve(events)
      sub.unsub()
    })
  })
}
