import { useNostr } from 'app/lib/useNostr'
import { useEffect } from 'react'
import { useLink } from 'solito/link'
import { Button, Separator, YGroup, YStack } from '@my/ui'
import { LogoutButton } from '../user/logout-button'
import { ChannelList } from './ChannelList'

export function ChannelsScreen() {
  const { connect } = useNostr()

  const linkprops = useLink({ href: '/settings' })

  const connectem = async () => {
    connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
  }

  useEffect(() => {
    connectem()
  }, [])

  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$haiti">
      <YGroup als="center" f={1} w="100%" separator={<Separator />}>
        <ChannelList />
        <Button {...linkprops}>Settings</Button>
        <LogoutButton />
      </YGroup>
    </YStack>
  )
}
