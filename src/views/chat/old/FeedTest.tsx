import { useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { relayInit } from '../lib/nostr-tools/relay'
import useChatStore, { ChatMessage } from './store'

export const FeedTest = () => {
  const { addMessage, messages } = useChatStore()

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
      addMessage(message)
    })
  }

  useEffect(() => {
    connect()
  }, [])

  // Show text of all messages
  return (
    <ScrollView>
      {messages.map((message) => (
        <Text key={message.id}>{message.text}</Text>
      ))}
    </ScrollView>
  )
}
