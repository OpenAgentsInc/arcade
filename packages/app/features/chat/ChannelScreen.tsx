import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'
import { Screen } from 'app/views'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { createParam } from 'solito'
import { Button, isWeb } from '@my/ui'
import { useNavigation } from '@react-navigation/native'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

const { useParam } = createParam<{ id: string }>()

// import type { NativeStackScreenProps } from '@react-navigation/native-stack'
// type Props = NativeStackScreenProps<ChatStackParamList, 'channel'>
// : React.FC<Props>

export const ChannelScreen = () => {
  const { relays, connect } = useNostr()
  const { setOptions } = isWeb ? { setOptions: () => {} } : useNavigation()
  const { checkAllUserMetadata } = useStore((s) => s.chatActions)

  const [id] = useParam('id')
  const channels = useStore((s) => s.channels)
  const channel = channels.find((c) => c.id === id)

  useEffect(() => {
    if (relays.length === 0) {
      connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
    }
  }, [relays])

  useEffect(() => {
    console.log('channel?.id, relays', channel?.id, relays)
    if (!channel || relays.length === 0) return
    console.log('Checking all user metadata')

    // horrible hack since messages may not have loaded yet
    setTimeout(() => {
      checkAllUserMetadata(channel.id)
    }, 1000)

    setTimeout(() => {
      checkAllUserMetadata(channel.id)
    }, 3000)
  }, [channel?.id, relays])

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
      {/* <ChannelHeader
        channelName={channel?.metadata.name ?? 'Unnamed Channel'}
        channelImageUrl={channel?.metadata.picture ?? generateRandomPlacekitten()}
      /> */}
      {/* <Button onPress={() => checkAllUserMetadata(channel.id)}>Test</Button> */}
      <MessageList channelId={channel.id} />
      <MessageInput channelId={channel.id} />
    </Screen>
  )
}

export type ChatStackParamList = {
  channel: { id: string; name: string }
}
