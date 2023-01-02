import { useStore } from 'app/stores'
import { Channel, ChatMessage } from 'app/stores/chat'
import { relayInit } from 'nostr-tools'
import { useRef } from 'react'
import { handleEvent } from './handleEvent'

export const useNostr = () => {
  const actions = useStore((s) => s.actions)
  //   const addChannel = useStore((s) => s.addChannel)
  //   const addMessage = useStore((s) => s.addMessage)
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

      let nostrChannelSub = relay.sub([
        {
          kinds: [40],
          limit: 1,
          ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
        },
      ])

      // Grab 15 channels.
      let sub = relay.sub([
        {
          kinds: [40],
          limit: 10,
          // ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
        },
      ])

      let sub2 = relay.sub([{ kinds: [42], limit: 35 }])

      nostrChannelSub.on('event', (event: any) => {
        handleEvent(event, actions)
      })

      sub.on('event', (event: any) => {
        handleEvent(event, actions)
      })

      sub2.on('event', (event: any) => {
        handleEvent(event, actions)
      })

      index += 1
    }
  }
  return {
    relays: relaysRef.current,
    connect,
  }
}
