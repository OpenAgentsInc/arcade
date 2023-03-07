import { relayInit } from 'nostr-tools'
import { useEffect, useState } from 'react'
import { Channel, ChannelMessage } from 'stores/types'

export function useChannelMessages(channel: Channel) {
  const [messages, setMessages] = useState<ChannelMessage[]>([])

  const relay = relayInit(channel.relayurl)
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
  })
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })

  const setupConnection = async () => {
    await relay.connect()

    // let's query for an event that exists
    const sub = relay.sub([
      {
        kinds: [42],
        '#e': [channel.eventid],
        limit: 10,
      },
    ])
    sub.on('event', (event) => {
      const channelMessage: ChannelMessage = {
        id: event.id,
        content: event.content,
        created_at: event.created_at,
        pubkey: event.pubkey,
      }
      setMessages((messages) => [...messages, channelMessage])
    })
    // sub.on('eose', () => {
    //   sub.unsub()
    // })
  }

  useEffect(() => {
    setupConnection()
  }, [])

  return messages
}
