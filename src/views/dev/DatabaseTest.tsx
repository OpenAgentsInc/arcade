import { useDatabase } from 'lib/database'
import { Stack } from 'tamagui'

import { RelayIndicator } from '../relay/RelayIndicator'
import { Screen } from '../shared'

export const DatabaseTest = () => {
  useDatabase()
  return (
    <Screen>
      <Stack f={1} jc="center" ai="center" />
      <RelayIndicator />
    </Screen>
  )
}
