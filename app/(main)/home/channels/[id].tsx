import { ActivityIndicator } from 'react-native'
import { Channel } from 'stores/chat'
import { YStack } from 'tamagui'
import { Screen } from 'views/shared'
import { MessageInput } from 'views/chat/MessageInput'
import { MessageList } from 'views/chat/MessageList'
import { useUserMetadataForChannel } from 'views/chat/useUserMetadataForChannel'
import { Stack, useSearchParams } from 'expo-router'

export default function Page() {
  const { id, name }: any = useSearchParams()

  if (!id)
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  return (
    <YStack backgroundColor="#000" f={1}>
      <MessageList channelId={id} />
      <MessageInput channelId={id} />
      <Stack.Screen options={{ title: name ?? 'Unnamed channel' }} />
    </YStack>
  )
}

export type StackNavigatorParams = {
  home: undefined
  create: undefined
  login: undefined
  channel: { channel: Channel }
}
