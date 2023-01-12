import { useDatabase } from 'lib/database'
import { useRelayPool } from 'lib/nostr'
import { Stack } from 'tamagui'

import { RelayIndicator } from '../relay/RelayIndicator'
import { Screen } from '../shared'

export const DatabaseTest = () => {
  useDatabase()
  useRelayPool({ connectNow: true })
  return (
    <Screen>
      <Stack f={1} jc="center" ai="center" />
      <RelayIndicator />
    </Screen>
  )
}
