import { FC } from 'react'
import { H1, YStack } from 'tamagui'

import { MyStack } from '../../components/MyStack'

export const HomeScreen: FC = () => {
  return (
    <MyStack>
      <YStack
        maxWidth={600}
        f={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$color1"
      >
        <H1 textAlign="center">Arc</H1>
      </YStack>
    </MyStack>
  )
}
