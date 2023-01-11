import { AnimatedFlashList } from '@shopify/flash-list'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { Text } from 'tamagui'

export const RelayManager = () => {
  const { relays } = useRelayPool(DEFAULT_RELAYS)

  return (
    <AnimatedFlashList
      ListHeaderComponent={
        <Text color="$color11" fontSize={24}>
          {relays.length} Relays
        </Text>
      }
      estimatedItemSize={150}
      data={relays}
      renderItem={({ item }) => (
        <Text color="$color11" fontSize={16}>
          {item.url} - {item.status}
        </Text>
      )}
    />
  )
}
