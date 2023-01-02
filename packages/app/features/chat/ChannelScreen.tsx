import { useStore } from 'app/stores'
import { useEffect } from 'react'
import { Screen } from 'views/shared'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<ChatStackParamList, 'channel'>

export const ChannelScreen: React.FC<Props> = ({ navigation, route }) => {
  const { channels } = useStore()
  const channel = channels.find((c) => c.id === route.params.id)
  const title = channel?.metadata.name
  useEffect(() => {
    navigation.setOptions({ title })
  }, [title])
  return (
    <Screen preset="fixed" unsafe>
      <MessageList />
      <MessageInput channelId={route.params.id} />
    </Screen>
  )
}

export type ChatStackParamList = {
  channel: { id: string; name: string }
}
