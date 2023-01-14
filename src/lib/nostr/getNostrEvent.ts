import { Filter } from 'nostr-tools'
import { useStore } from 'stores'

import { db } from '../database'
import { handleEvent } from './handleEvent'
// eslint-disable-next-line import/order
import { NostrEvent } from './NostrEvent'
import { relayPoolInstance } from './relaypool'

export const getNostrEvent = async (
  filter?: Filter[],
  onError = (relay) => {
    console.log('error', relay)
  }
): Promise<NostrEvent> => {
  const relays = useStore.getState().relays
  console.log('using filter:', filter)
  return new Promise((resolve) => {
    relays.forEach((relayInfo) => {
      //   console.log(relayPoolInstance)
      console.log('checking relay', relayInfo.url)
      const relay = relayPoolInstance?.relayByUrl.get(relayInfo.url)
      //   console.log('RELAY?', relay)
      //   return
      if (!relay) return
      const sub = relay.sub([{ ...filter }])

      sub.on('event', (event) => {
        console.log('GOT EVENT KIND:', event.kind)
        // if (event.kind !== 0) {
        //   sub.unsub()
        //   onError(relay)
        // } else {
        //   console.log('HANDLING?')
        handleEvent(event, db)
        resolve(event)
        // }
        // const nostrEvent = event

        // const { content: stringifedContent, ...rest } = nostrEvent

        // if (stringifedContent === '') {
        //   resolve(nostrEvent)
        // } else {
        //   try {
        //     const content = JSON.parse(stringifedContent)
        //     resolve({ content, ...rest })
        //   } catch (e) {
        //     console.log('error parsing content', e)
        //     console.log('', nostrEvent)
        //   }
        // }

        // sub.unsub()
      })

      sub.on('eose', () => {
        console.log('getNostrEvent eose: ', relay)
        onError(relay)
        sub.unsub()
      })
    })
  })
}
