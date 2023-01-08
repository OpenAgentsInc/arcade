import { FC } from 'react'
import { H1, YStack } from 'tamagui'

import { MyStack } from '../../components/MyStack'

export const HomeScreen: FC = () => {
  return (
    <MyStack>
      <YStack space="$4" maxWidth={600}>
        <H1 textAlign="center">Arc</H1>
      </YStack>
    </MyStack>
  )
}
