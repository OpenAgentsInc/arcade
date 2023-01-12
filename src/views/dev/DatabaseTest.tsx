import { useDatabase } from 'lib/database'
import { useAuthed, useInterval } from 'lib/hooks'
import { useRelayPool } from 'lib/nostr'
import { useEffect, useState } from 'react'

import { RelayIndicator } from '../relay/RelayIndicator'
import { RelayManager } from '../relay/RelayManager'
import { Screen } from '../shared'

export const DatabaseTest = () => {
  useAuthed()
  useDatabase()
  //   useRelayPool({ connectNow: true })

  //   const [count, setCount] = useState(0)

  //   useInterval(() => {
  //     setCount(count + 1)
  //   }, 1000)

  //   useEffect(() => {
  //     console.log('count is:', count)
  //   }, [count])

  return (
    <Screen>
      {/* <RelayIndicator /> */}
      <RelayManager />
    </Screen>
  )
}
