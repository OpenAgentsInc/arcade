import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Key, UserPlus } from '@tamagui/lucide-icons'
// import { StackNavigatorParams } from 'navigation/nav-types'
import { Button, Stack, YStack } from 'tamagui'
import { Logo, Screen } from '@my/ui/src'

export function HomeScreen() {
  //   const { navigate } =
  //     useNavigation<NativeStackNavigationProp<StackNavigatorParams>>()
  return (
    <Screen>
      <YStack f={1} alignItems="center" justifyContent="space-evenly">
        <Stack />
        <Logo />
        <YStack space="$6">
          <Button
            // onPress={() => navigate('create')}
            als="center"
            icon={UserPlus}
            size="$5"
            focusStyle={{ opacity: 0.9, borderWidth: 0 }}
            bg="$color6"
            elevation="$6"
          >
            Create Account
          </Button>
          <Button
            // onPress={() => navigate('login')}
            als="center"
            icon={Key}
            size="$5"
            focusStyle={{ opacity: 0.9, borderWidth: 0 }}
            bg="$color1"
            elevation="$6"
          >
            Login
          </Button>
        </YStack>
      </YStack>
    </Screen>
  )
}
