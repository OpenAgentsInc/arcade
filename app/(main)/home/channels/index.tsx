import { Separator, YGroup, YStack } from 'tamagui'
import { ChannelList } from 'views/chat/ChannelList'
import { Stack } from 'expo-router'

export default function Page() {
  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="#000">
      <YGroup
        als="center"
        f={1}
        w="100%"
        separator={<Separator />}
        backgroundColor="#000"
      >
        <ChannelList />
      </YGroup>
      <Stack.Screen options={{ title: 'Channels' }} />
    </YStack>
  )
}
