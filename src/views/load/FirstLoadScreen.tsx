import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Stack, Text } from 'tamagui'

import { Screen } from '../shared'

export const FirstLoadScreen = () => {
  const navigation = useNavigation<any>()
  useEffect(() => {
    setTimeout(() => {
      console.log('lezzgo')
      navigation.reset({
        index: 0,
        routes: [{ name: 'tabs' }],
      })
    }, 1000)
  }, [])

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center">
        <Text color="$color10" fontSize={24}>
          Let's load stuff
        </Text>
      </Stack>
    </Screen>
  )
}
