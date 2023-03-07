import { useChannelMessages } from 'lib/hooks'
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { Channel } from 'stores/types'

import { Message } from './Message'

type Props = {
  channel: Channel
}

export const MessageList: React.FC<Props> = ({ channel }) => {
  const messages = useChannelMessages(channel).sort((a, b) => {
    return a.created_at - b.created_at
  })

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
