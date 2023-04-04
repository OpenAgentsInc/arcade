import { useChatClient } from 'lib/hooks'
import { useEffect } from 'react'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo' // Or stream-chat-expo
import { useNavigation, useRoute } from '@react-navigation/native'

export const ChannelScreen = () => {
  const route: any = useRoute()
  const { client } = useChatClient()
  const channelData = route.params?.channel
  const channel = client.channel(channelData.channelType, channelData.channelId)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: channel?.data?.name })
  }, [channel])

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  )
}
