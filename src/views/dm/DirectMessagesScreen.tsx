import { useDirectMessages } from 'lib/hooks/useDirectMessages'
import { Text } from 'tamagui'

import { Screen } from '../shared'

export const DirectMessagesScreen = () => {
  const mydms = useDirectMessages()
  console.log('DMs:', mydms.length)
  return (
    <Screen>
      <Text> Hello</Text>
    </Screen>
  )
}
