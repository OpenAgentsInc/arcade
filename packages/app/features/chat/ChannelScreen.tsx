import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'
import { Screen } from 'app/views'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { createParam } from 'solito'
import { isWeb } from '@my/ui'
import { useNavigation } from '@react-navigation/native'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { useUserMetadataForChannel } from './useUserMetadataForChannel'

const { useParam } = createParam<{ id: string }>()

export const ChannelScreen = () => {
  const { relays, connect } = useNostr()
  const { setOptions } = isWeb ? { setOptions: () => {} } : useNavigation()

  const [id] = useParam('id')
  const channels = useStore((s) => s.channels)
  const channel = channels.find((c) => c.id === id)

  useUserMetadataForChannel(channel?.id ?? '')

  useEffect(() => {
    if (relays.length === 0) {
      connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
    }
  }, [relays])

  useEffect(() => {
    !isWeb && setOptions({ title: channel?.metadata.name ?? 'Unnamed Channel' })
  }, [channel])

  if (!channel)
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  return (
    <Screen>
      <MessageList channelId={channel.id} />
      <MessageInput channelId={channel.id} />
    </Screen>
  )
}

export type ChatStackParamList = {
  channel: { id: string; name: string }
}
