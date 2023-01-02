import { H1, Paragraph, Separator, XStack, YStack } from '@my/ui'
import { LogoutButton } from '../user/logout-button'

export function ChannelScreen() {
  const channels = useChannels()
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space backgroundColor="$haiti">
      <YStack space="$4" maw={600}>
        <H1 ta="center" color="$moonRaker">
          Channels
        </H1>
        <Separator borderColor="$blueBellFaded" />
        <Paragraph ta="center" color="$blueBell">
          lol heres ur channels
        </Paragraph>
      </YStack>

      <XStack mt="$8">
        <LogoutButton />
      </XStack>
    </YStack>
  )
}
