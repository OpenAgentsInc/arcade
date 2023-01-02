import { useNostr } from 'app/lib/useNostr'
import { useEffect, useMemo } from 'react'
import { H1, Paragraph, Separator, XStack, YStack } from '@my/ui'
import { LogoutButton } from '../user/logout-button'
import { useChannels } from './useChannels'

export function ChannelScreen() {
  const { relay, connect } = useNostr()

  useEffect(() => {
    connect()
  }, [])

  useMemo(() => {
    console.log('relay', relay)
  }, [relay])

  const channels = useChannels()
  console.log('channels', channels)
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
