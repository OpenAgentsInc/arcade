import { Button, Image, LinearGradient, Stack, YStack } from 'tamagui'
import { palette } from '@my/ui'
import { ChevronsRight, Key, LogIn } from '@tamagui/lucide-icons'

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
      <YStack f={1} alignItems="center" justifyContent="space-evenly">
        <Stack />
        <Image src={require('./prelogo.png')} width={200} height={200} mt={-60} />
        <Button als="center" icon={Key} size="$6" theme="blue">
          Create Account
        </Button>
      </YStack>
    </LinearGradient>
  )
}
