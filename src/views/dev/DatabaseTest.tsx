import { useDatabase } from 'lib/database'
import { useAuthed } from 'lib/hooks'
import { useRelayPool } from 'lib/nostr'
import { Stack } from 'tamagui'

import { RelayIndicator } from '../relay/RelayIndicator'
import { Screen } from '../shared'

export const DatabaseTest = () => {
  useAuthed()
  useDatabase()
  useRelayPool({ connectNow: true })
  return (
    <Screen>
      <Stack f={1} jc="center" ai="center" />
      <RelayIndicator />
    </Screen>
  )
}
