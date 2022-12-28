import * as React from 'react'
import { FlatList } from 'react-native'
import { useMessages } from '../../../hooks/useMessages'
import { Message } from './Message'

type Props = {}

export const MessageList: React.FC<Props> = () => {
  const messages = useMessages()
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <Message message={item} />}
      keyExtractor={(item) => item.id}
      style={{ paddingHorizontal: 10 }}
    />
  )
}
