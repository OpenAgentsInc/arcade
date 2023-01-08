import { Separator, YGroup, YStack } from 'tamagui'
import { ChannelList } from './ChannelList'

export function ChannelsScreen() {
  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$haiti">
      <YGroup als="center" f={1} w="100%" separator={<Separator />}>
        <ChannelList />
      </YGroup>
    </YStack>
  )
}
