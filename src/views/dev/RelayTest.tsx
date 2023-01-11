import { DEFAULT_RELAYS } from 'app/lib/constants/relays'
import { useRelayPool } from 'app/lib/nostr/relaypool/useRelayPool'
import { useEffect } from 'react'
import { Stack, Text } from 'tamagui'

import { Screen } from '../shared'

export const RelayTest = () => {
  const { relays, setupInitialSubscriptions } = useRelayPool(DEFAULT_RELAYS)
  useEffect(() => {
    setTimeout(() => {
      setupInitialSubscriptions()
    }, 3000)
  }, [setupInitialSubscriptions])
  return (
    <Screen>
      <Stack f={1} jc="center" ai="center">
        <Text color="$color11" fontSize={24}>
          {relays.length} Relays
        </Text>
      </Stack>
    </Screen>
  )
}
