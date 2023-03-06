import { checkRelayForEvent } from 'lib/nostr/checkRelayForEvent'
import { useEffect } from 'react'
import { Separator, YGroup, YStack } from 'tamagui'

import { ChannelList } from './ChannelList'

export function DiscoverScreen() {
  useEffect(() => {
    checkRelayForEvent(
      '328739e4abf254786ad059fc104ecd23aef22d81daa0853e89ba1aeec94035b2'
    )
  }, [])

  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$background">
      <YGroup als="center" f={1} w="100%" separator={<Separator />}>
        <ChannelList joined={false} />
      </YGroup>
    </YStack>
  )
}
