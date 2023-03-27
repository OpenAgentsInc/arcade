import { Separator, YGroup, YStack } from 'tamagui'

import { ChannelList } from '../components'

export function ChannelsScreen() {
  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$background">
      <YGroup als="center" f={1} w="100%" separator={<Separator />}>
        <ChannelList joined />
      </YGroup>
    </YStack>
  )
}
