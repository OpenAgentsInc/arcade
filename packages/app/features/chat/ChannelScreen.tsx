import { useNostr } from 'app/lib/useNostr'
import { generateRandomPlacekitten } from 'app/lib/utils'
import { useStore } from 'app/stores'
import { Screen } from 'app/views'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { createParam } from 'solito'
import { ChannelHeader } from './ChannelHeader'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

const { useParam } = createParam<{ id: string }>()

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
type Props = NativeStackScreenProps<ChatStackParamList, 'channel'>

export const ChannelScreen: React.FC<Props> = () => {
  const { relays, connect } = useNostr()
  useEffect(() => {
    if (relays.length === 0) {
      connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
    }
  }, [relays])
  const [id] = useParam('id')
  const { channels } = useStore()
  const channel = channels.find((c) => c.id === id)
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
