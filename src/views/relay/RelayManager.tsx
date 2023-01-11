import { AnimatedFlashList } from '@shopify/flash-list'
import { CircleDot, CircleSlashed } from '@tamagui/lucide-icons'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { RelayInfo } from 'stores/relay'
import { ListItem, Stack, Switch } from 'tamagui'

export const RelayManager = () => {
  const { relays } = useRelayPool(DEFAULT_RELAYS)

  return (
    <AnimatedFlashList
      ListHeaderComponent={<Stack h={60} />}
      estimatedItemSize={150}
      data={relays}
      renderItem={({ item }: { item: RelayInfo }) => (
        <ListItem
          hoverTheme
          pressTheme
          title={item.url}
          subTitle={item.status}
          icon={
            item.status === 'connected' ? (
              <CircleDot color="green" size={20} />
            ) : (
              <CircleSlashed color="red" size={20} />
            )
          }
          iconAfter={
            <Switch size="$2" checked={item.status === 'connected'}>
              <Switch.Thumb animation="quick" />
            </Switch>
          }
        />
      )}
    />
  )
}
