import * as React from 'react'
import { FlatList, View } from 'react-native'

import { Message } from './Message'
import { useMessagesForChannel } from './useMessagesForChannel'

type Props = {
  channelId: string
}

export const MessageList: React.FC<Props> = ({ channelId }) => {
  const messages = useMessagesForChannel(channelId)
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <Message message={item} />}
      keyExtractor={(item) => item.id}
      style={{ paddingHorizontal: 10 }}
      ListFooterComponent={<View style={{ margin: 5 }} />}
    />
  )
}
