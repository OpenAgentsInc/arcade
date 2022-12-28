import * as React from 'react'
import { FlatList } from 'react-native'
import { messages } from '../../../lib/dummydata'
import { Message } from './Message'

type Props = {}

export const MessageList: React.FC<Props> = () => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <Message message={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}
