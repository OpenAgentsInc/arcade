import { styled, YStack } from 'tamagui'

export const Screen = styled(YStack, {
  name: 'Screen',
  bc: '$haiti',

  flex: 1,

  variants: {
    blue: {
      true: {
        backgroundColor: 'blue',
      },
    },
  } as const,
})
