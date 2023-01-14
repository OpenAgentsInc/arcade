import { useDatabase } from 'lib/database'
import { useAuthed } from 'lib/hooks'
import { useRelayPool } from 'lib/nostr'

import { RelayManager } from '../relay/RelayManager'
import { Screen } from '../shared'

export const DatabaseTest = () => {
  useAuthed()
  useDatabase()
  useRelayPool({ connectNow: true })

  return (
    <Screen>
      {/* <RelayIndicator /> */}
      <RelayManager />
    </Screen>
  )
}
