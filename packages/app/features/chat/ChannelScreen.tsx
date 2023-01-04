import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'
import { Screen } from 'app/views'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { createParam } from 'solito'
import { useNavigation } from '@react-navigation/native'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

const { useParam } = createParam<{ id: string }>()

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
type Props = NativeStackScreenProps<ChatStackParamList, 'channel'>

export const ChannelScreen: React.FC<Props> = () => {
  const { relays, connect } = useNostr()
  const { setOptions } = useNavigation()
  useEffect(() => {
    if (relays.length === 0) {
      connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
    }
  }, [relays])
  const [id] = useParam('id')
  const { channels } = useStore()
  const channel = channels.find((c) => c.id === id)
  useEffect(() => {
    setOptions({ title: channel?.metadata.name ?? 'Unnamed Channel' })
  }, [channel])
  if (!channel)
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  return (
    <Screen>
      {/* <ChannelHeader
        channelName={channel?.metadata.name ?? 'Unnamed Channel'}
        channelImageUrl={channel?.metadata.picture ?? generateRandomPlacekitten()}
      /> */}
      <MessageList channelId={channel.id} />
      <MessageInput channelId={channel.id} />
    </Screen>
  )
}

export type ChatStackParamList = {
  channel: { id: string; name: string }
}
