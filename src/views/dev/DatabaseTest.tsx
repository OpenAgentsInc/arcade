import { useDatabase } from 'lib/hooks'
import { useRelayPool } from 'lib/nostr'
import { Stack } from 'tamagui'

import { Screen } from '../shared'

export const DatabaseTest = () => {
  useDatabase()
  useRelayPool()

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center" />
    </Screen>
  )
}
