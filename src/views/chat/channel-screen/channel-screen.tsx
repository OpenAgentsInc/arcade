import { useEffect } from 'react'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo' // Or stream-chat-expo
import { useNavigation, useRoute } from '@react-navigation/native'

export const ChannelScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ title: 'Demo Chat' })
  }, [])

  const route: any = useRoute()
  const channel = route.params?.channel

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  )
}
