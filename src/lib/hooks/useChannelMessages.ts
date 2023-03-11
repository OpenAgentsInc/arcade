import { relayInit } from 'nostr-tools'
import { useEffect, useState } from 'react'
import { Channel, ChannelMessage } from 'stores/types'

export function useChannelMessages(channel: Channel) {
  const [messages, setMessages] = useState<ChannelMessage[]>([])

  useEffect(() => {
    let sub: any
    const relay = relayInit(channel.relayurl)
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })

    const setupConnection = async () => {
      await relay.connect()

      sub = relay.sub([
        {
          kinds: [42],
          '#e': [channel.eventid],
          limit: 100,
          since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 3,
        },
      ])
      sub.on('event', (event: any) => {
        const channelMessage: ChannelMessage = {
          id: event.id,
          content: event.content,
          created_at: event.created_at,
          pubkey: event.pubkey,
        }
        setMessages((messages) => [...messages, channelMessage])
      })

      return sub.unsub
    }

    const unsubscribe = async () => {
      const unsub = await setupConnection()
      unsub()
    }

    setupConnection()

    return () => {
      unsubscribe()
      relay.close()
    }
  }, [channel])

  return messages
}
