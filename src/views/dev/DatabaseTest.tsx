import { useDatabase } from 'lib/hooks'
import { useRelayPool } from 'lib/nostr'
import { Button, Stack, Text } from 'tamagui'

import { Screen } from '../shared'

export const DatabaseTest = () => {
  useDatabase()
  const { connectedRelays } = useRelayPool()

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center" />
      {/* Put an absolutely-positioned button at top right, a round button with an icon */}
      <Button
        onPress={() => console.log('Pressed')}
        bc="$color6"
        opacity={0.8}
        circular
        pos="absolute"
        top={50}
        right={20}
      >
        <Text color="$color11">{connectedRelays.length}</Text>
      </Button>
    </Screen>
  )
}
