import { useNostr } from 'app/lib/useNostr'
import { useEffect } from 'react'
import { H1, Paragraph, Separator, XStack, YGroup, YStack } from '@my/ui'
import { LogoutButton } from '../user/logout-button'
import { ChannelList } from './ChannelList'
import { useChannels } from './useChannels'

export function ChannelsScreen() {
  const { relays, connect } = useNostr()

  useEffect(() => {
    console.log('relays', relays)
  }, [relays])

  const connectem = async () => {
    connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
  }

  useEffect(() => {
    connectem()
  }, [])

  const channels = useChannels()
  console.log('channels', channels)
  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$haiti">
      {/* <YStack space="$4" maw={600}>
        <H1 ta="center" color="$moonRaker">
          Channels
        </H1>
        <Separator borderColor="$blueBellFaded" />
        <Paragraph ta="center" color="$blueBell">
          lol heres ur channels
        </Paragraph>
      </YStack> */}
      <YGroup als="center" f={1} w="100%" separator={<Separator />}>
        <ChannelList />
      </YGroup>

      {/* <XStack mt="$8">
        <LogoutButton />
      </XStack> */}
    </YStack>
  )
}
