import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { useRelayPool } from 'app/lib/nostr/relaypool/useRelayPool'
import { useEffect } from 'react'
import { Stack } from 'tamagui'

import { RelayManager } from '../relay/RelayManager'
import { Screen } from '../shared'

export const RelayTest = () => {
  const { setupInitialSubscriptions } = useRelayPool(DEFAULT_RELAYS)
  useEffect(() => {
    setTimeout(() => {
      setupInitialSubscriptions()
    }, 1000)
  }, [setupInitialSubscriptions])
  return (
    <Screen>
      <RelayManager />
    </Screen>
  )
}
