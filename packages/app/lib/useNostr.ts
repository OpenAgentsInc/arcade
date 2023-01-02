import { useStore } from 'app/stores'
import { relayInit } from 'nostr-tools'
import { useRef } from 'react'
import { handleEvent } from './handleEvent'

export const useNostr = () => {
  const actions = useStore((s) => s.actions)
  const relaysRef = useRef<any[]>([])
  const connect = async (urls: string[]) => {
    let index = 0
    for (const url of urls) {
      let relay = relaysRef.current[index]
      if (!relay || relay.url !== url) {
        relay = relayInit(url)
        relaysRef.current.splice(index, 1, relay)
      }
      await relay.connect()
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
      })
      relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
      })

      subscriptions.forEach((subscription) => {
        const sub = relay.sub([subscription])
        sub.on('event', (event: any) => {
          handleEvent(event, actions)
        })
      })

      index += 1
    }
  }

  console.log('Relays:', relaysRef.current)
  return {
    relays: relaysRef.current,
    connect,
  }
}

const subscriptions = [
  // Subscribe to the Nostr channel
  {
    kinds: [40],
    limit: 1,
    ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
  },
  // Subscribe to 10 other channels
  { kinds: [40], limit: 10 },
  // Subscribe to messages and grab 35
  { kinds: [42], limit: 35 },
]
