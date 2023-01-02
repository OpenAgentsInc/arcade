import { useStore } from 'app/stores'
import { Channel, ChatMessage } from 'app/stores/chat'
import { relayInit } from 'nostr-tools'
import { useRef } from 'react'

export const useNostr = () => {
  const addChannel = useStore((s) => s.addChannel)
  const addMessage = useStore((s) => s.addMessage)
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
      // Grab 15 channels.
      let sub = relay.sub([
        {
          kinds: [40],
          limit: 15,
          // ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
        },
      ])
      sub.on('event', (event: any) => {
        // console.log(event)

        switch (event.kind) {
          case 40:
            // Event is a channel
            const channel: Channel = {
              id: event.id,
              kind: event.kind,
              pubkey: event.pubkey,
              sig: event.sig,
              tags: event.tags,
              metadata: JSON.parse(event.content),
              timestamp: event.created_at.toString(),
            }
            addChannel(channel)

            break

          case 42:
            // Event is a message
            const message: ChatMessage = {
              id: event.id,
              sender: event.pubkey,
              text: event.content,
              timestamp: event.created_at.toString(),
            }
            addMessage(message)
            break

          default:
            console.log(`Unhandled event kind: ${event.kind}`)
        }
      })

      index += 1
    }
  }
  return {
    relays: relaysRef.current,
    connect,
  }
}
