import { useChannelMessages } from 'lib/hooks'
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { Channel } from 'stores/types'
import { Stack, Text } from 'tamagui'
import { Message } from '@my/ui/src/components/Message'

// import { Message } from './Message'

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
      ListEmptyComponent={() => (
        <Stack mt="$4" f={1} jc="center" ai="center" h={500}>
          <Text color="$color10" textAlign="center">
            No messages found from last 14 days
          </Text>
        </Stack>
      )}
    />
  )
}
