import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { useRelayPool } from 'app/lib/nostr/relaypool/useRelayPool'
import { Stack, Text } from 'tamagui'

export const RelayManager = () => {
  const { relays } = useRelayPool(DEFAULT_RELAYS)

  return (
    <Stack f={1} jc="center" ai="center">
      <Text color="$color11" fontSize={24}>
        {relays.length} Relays
      </Text>
      {relays.map((relay) => (
        <Text key={relay.url} color="$color11" fontSize={16}>
          {relay.url} - {relay.status}
        </Text>
      ))}
    </Stack>
  )
}
