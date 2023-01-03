import { Button, Image, LinearGradient, Stack, YStack } from 'tamagui'
import { palette } from '@my/ui'
import { ChevronsRight, Key, LogIn, UserPlus } from '@tamagui/lucide-icons'

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
        <YStack space="$6">
          <Button
            als="center"
            icon={UserPlus}
            size="$6"
            theme="blue"
            // bc="$electricIndigo"
            focusStyle={{ opacity: 0.9, borderWidth: 0 }}
            // hoverStyle={{ backgroundColor: '$electricIndigo', borderWidth: 0 }}
            shadowColor={palette.portGore}
            // shadowOffset={{ width: 1.5, height: 1.5 }}
            shadowRadius={8}
            shadowOpacity={0.3}
          >
            Create Account
          </Button>
          <Button
            als="center"
            icon={Key}
            size="$4"
            theme="blue_darker"
            shadowColor={'#000'}
            focusStyle={{ opacity: 0.9, borderWidth: 0 }}
            // shadowOffset={{ width: 1.5, height: 1.5 }}
            shadowRadius={8}
            shadowOpacity={0.3}
          >
            Log in with backup key
          </Button>
        </YStack>
      </YStack>
    </LinearGradient>
  )
}
