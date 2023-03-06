import { Separator, YGroup, YStack } from 'tamagui'

import { ChannelList } from './ChannelList'

export function DiscoverScreen() {
  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$background">
      <YGroup als="center" f={1} w="100%" separator={<Separator />}>
        <ChannelList joined={false} />
      </YGroup>
    </YStack>
  )
}
