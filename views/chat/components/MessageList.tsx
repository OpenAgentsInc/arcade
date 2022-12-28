import * as React from 'react'
import { FlatList, View, Text } from 'react-native'
import { ChatMessage } from '../../../components/store'
import { Message } from './Message'

type Props = {}

export const MessageList: React.FC<Props> = () => {
  const messages: ChatMessage[] = [
    {
      id: '1',
      sender: 'Alice',
      text: 'Hello, how are you?',
      timestamp: '2022-01-01T12:00:00Z',
    },
    {
      id: '2',
      sender: 'Bob',
      text: "I'm good, thanks for asking!",
      timestamp: '2022-01-01T12:01:00Z',
    },
    {
      id: '3',
      sender: 'Alice',
      text: "That's great to hear! What have you been up to lately?",
      timestamp: '2022-01-01T12:02:00Z',
    },
    {
      id: '4',
      sender: 'Bob',
      text: "I've been busy with work and spending time with my family. How about you?",
      timestamp: '2022-01-01T12:03:00Z',
    },
  ]

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <Message message={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}
