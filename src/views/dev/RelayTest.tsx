import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { useRelayPool } from 'app/lib/nostr/relaypool/useRelayPool'
import { useEffect } from 'react'
import { Text } from 'tamagui'

import { Screen } from '../shared'

export const RelayTest = () => {
  const { setupInitialSubscriptions } = useRelayPool(DEFAULT_RELAYS)
  useEffect(() => {
    setTimeout(() => {
      setupInitialSubscriptions()
    }, 3000)
  }, [setupInitialSubscriptions])
  return (
    <Screen>
      <Text>RelayTest</Text>
    </Screen>
  )
}
