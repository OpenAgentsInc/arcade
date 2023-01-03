import { Image, LinearGradient, YStack } from 'tamagui'
import { palette } from '@my/ui'

export function HomeScreen() {
  return (
    <LinearGradient
      f={1}
      br="$4"
      colors={[palette.bg, palette.haiti]}
      start={[1, 1]}
      end={[0, 0]}
      justifyContent="center"
      alignItems="center"
    >
      <YStack space={4} f={1} alignItems="center" justifyContent="center">
        <Image src={require('./prelogo.png')} width={200} height={200} mt={-60} />
      </YStack>
    </LinearGradient>
  )
}
