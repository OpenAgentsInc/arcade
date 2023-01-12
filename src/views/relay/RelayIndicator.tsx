import { useRelayPool } from 'lib/nostr'
import { Button, Text } from 'tamagui'

export const RelayIndicator = () => {
  const { connectedRelays } = useRelayPool()
  return (
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
  )
}
