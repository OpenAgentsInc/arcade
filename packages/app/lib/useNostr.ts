import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'
import { useStore } from 'app/stores'
import { relayInit } from 'nostr-tools'
import { useState } from 'react'
import { handleEvent } from './handleEvent'

export const useNostr = () => {
  const actions = useStore((s) => s.actions)
  const [relays, setRelays] = useState<any[]>([])
  const connect = async (urls: string[]) => {
    let index = 0
    for (const url of urls) {
      let relay = relays[index]
      if (!relay || relay.url !== url) {
        relay = relayInit(url)
        relays.splice(index, 1, relay)
        setRelays([...relays])
      }
      await relay.connect()
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
      })
      relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
      })

      initialSubscriptions.forEach((subscription) => {
        const sub = relay.sub([subscription])
        sub.on('event', (event: any) => {
          handleEvent(event, actions)
        })
      })

      index += 1
    }
  }

  console.log('Relays:', relays)
  return {
    relays,
    connect,
  }
}
