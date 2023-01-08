import { useStore } from 'app/stores'
import { Screen } from 'app/views'
import { ActivityIndicator } from 'react-native'

import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { useUserMetadataForChannel } from './useUserMetadataForChannel'

export const ChannelScreen = () => {
  //   const { relays, connect } = useNostr()
  const channels = useStore((s) => s.channels)
  const channel = channels.find((c) => c.id === id)

  useUserMetadataForChannel(channel?.id ?? '')

  //   useEffect(() => {
  //     if (relays.length === 0) {
  //       connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
  //     }
  //   }, [relays])

  //   useEffect(() => {
  //     !isWeb && setOptions({ title: channel?.metadata.name ?? 'Unnamed Channel' })
  //   }, [channel])

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
