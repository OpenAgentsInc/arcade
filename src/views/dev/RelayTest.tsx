import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { useRelayPool } from 'app/lib/nostr/relaypool/useRelayPool'
import { Text } from 'tamagui'

import { Screen } from '../shared'

export const RelayTest = () => {
  useRelayPool(DEFAULT_RELAYS)
  return (
    <Screen>
      <Text>RelayTest</Text>
    </Screen>
  )
}
