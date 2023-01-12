import { useDatabase } from 'lib/hooks'
import { Stack } from 'tamagui'

import { Screen } from '../shared'

export const DatabaseTest = () => {
  useDatabase()

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center" />
    </Screen>
  )
}
