import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { useStore } from 'stores/index'
import { ChannelMessage } from 'stores/types'

import { Message } from './Message'

type Props = {
  channelId: string
}

export const MessageList: React.FC<Props> = ({ channelId }) => {
  //   const messages: ChannelMessage[] = []
  const [messages, setMessages] = React.useState<ChannelMessage[]>([])
  const queryClient = useQueryClient()
  const apiToken = useStore((s) => s.apiToken)

  // make a useQuery to $response = $this->get('/api/channels/' . $channel->id . '/messages');
  useQuery({
    queryKey: [`channel-messages/${channelId}`],
    queryFn: () => {
      return axios.get(
        `http://localhost:8000/api/channels/${channelId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
    },
    onSuccess: (data) => {
      console.log('Successfully fetched messages for channel', channelId)
      console.log('data', data.data.messages)
      setMessages(data.data.messages)
      //   queryClient.invalidateQueries({
      //     queryKey: [`channel-messages/${channelId}`],
      //   })
    },
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
