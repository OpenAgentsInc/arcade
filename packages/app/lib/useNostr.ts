import { useStore } from 'app/stores'
import { relayInit } from 'nostr-tools'
import { useRef } from 'react'
import { handleEvent } from './handleEvent'

export const useNostr = () => {
  const actions = useStore((s) => s.actions)
  const relaysRef = useRef<any[]>([])
  const connect = async (urls: string[]) => {
    if (relaysRef.current.length > 0) {
      console.log('Already connected to some relays, ignoring new connections')
      return
    }
    let index = 0
    for (const url of urls) {
      if (!relaysRef.current[index]) {
        relaysRef.current[index] = relayInit(url)
      }
      let relay = relaysRef.current[index]
      await relay.connect()
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
      })
      relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
      })

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

      subscriptions.forEach((subscription) => {
        const sub = relay.sub([subscription])
        sub.on('event', (event: any) => {
          handleEvent(event, actions)
        })
      })

      index += 1
    }
  }
  return {
    relays: relaysRef.current,
    connect,
  }
}
