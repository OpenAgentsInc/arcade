import { AnimatedFlashList } from '@shopify/flash-list'
import { ChevronRight, Star } from '@tamagui/lucide-icons'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { ListItem, Text } from 'tamagui'

export const RelayManager = () => {
  const { relays } = useRelayPool(DEFAULT_RELAYS)

  return (
    <AnimatedFlashList
      ListHeaderComponent={
        <Text
          color="$color11"
          fontSize={24}
          textAlign="center"
          mt="$12"
          mb="$4"
        >
          {relays.length} Relays
        </Text>
      }
      estimatedItemSize={150}
      data={relays}
      renderItem={({ item }) => (
        <ListItem
          hoverTheme
          pressTheme
          title={item.url}
          subTitle={item.status}
          icon={Star}
          iconAfter={ChevronRight}
        />
      )}
    />
  )
}
