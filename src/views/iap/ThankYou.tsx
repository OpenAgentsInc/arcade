import { H2, YStack } from 'tamagui'

export const ThankYou = () => {
  return (
    <YStack backgroundColor="#000" f={1} p="$4" justifyContent="space-between">
      <H2 color="#fff" mt="$5" mb="$3" letterSpacing={0.1}>
        Success!
      </H2>
    </YStack>
  )
}
