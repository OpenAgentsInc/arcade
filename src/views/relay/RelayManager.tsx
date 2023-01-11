import { AnimatedFlashList } from '@shopify/flash-list'
import { ChevronRight, Star } from '@tamagui/lucide-icons'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { ListItem, Stack } from 'tamagui'

export const RelayManager = () => {
  const { relays } = useRelayPool(DEFAULT_RELAYS)

  return (
    <AnimatedFlashList
      ListHeaderComponent={<Stack h={60} />}
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
