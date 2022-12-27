import { useEffect, useState } from 'react'
import { ChatMessage } from '../components/store'
import { relayInit } from '../lib/nostr-tools/relay'
// import { ChatMessage } from './store';

const useRelayConnection = () => {
  const [relay, setRelay] = useState<null | any>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const connect = async () => {
    const relay = relayInit('wss://relay.damus.io')

    await relay.connect()
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })

    let sub = relay.sub([
      {
        kinds: [1],
        limit: 5,
      },
    ])

    sub.on('event', (event: any) => {
      console.log('got event:', event)
      const message: ChatMessage = {
        id: event.id,
        sender: event.pubkey,
        text: event.content,
        timestamp: event.created_at.toString(),
      }
      setMessages((prevMessages) => [...prevMessages, message])
    })
  }

  useEffect(() => {
    console.log('NostrTest')
    connect()
  }, [])

  return {
    relay,
    messages,
    connect,
  }
}

export default useRelayConnection
