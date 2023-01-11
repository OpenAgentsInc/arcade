import { AnimatedFlashList } from '@shopify/flash-list'
import {
  CircleDot,
  CircleSlashed,
  Plus,
  PlusCircle,
} from '@tamagui/lucide-icons'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { RelayInfo } from 'stores/relay'
import {
  ListItem,
  Separator,
  Stack,
  Switch,
  Text,
  XStack,
  YStack,
} from 'tamagui'

export const RelayManager = () => {
  const { relays } = useRelayPool(DEFAULT_RELAYS)

  return (
    <AnimatedFlashList
      ListHeaderComponent={
        <YStack pt={70}>
          <XStack px="$4" justifyContent="space-between">
            <Text color="$color12" fontSize={18}>
              Relays ({relays.length})
            </Text>
            <PlusCircle size={20} color="$color12" />
          </XStack>
          <Separator mt="$4" mb="$2" />
        </YStack>
      }
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
