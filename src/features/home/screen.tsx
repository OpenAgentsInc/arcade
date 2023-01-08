import { FC } from 'react'
import { YStack } from 'tamagui'

import { Logo } from '../../components/Logo'
import { Screen } from '../../components/Screen'

export const HomeScreen: FC = () => {
  return (
    <Screen>
      <YStack maxWidth={600} f={1} justifyContent="center" alignItems="center">
        <Logo />
      </YStack>
    </Screen>
  )
}
