import { Key, UserPlus } from '@tamagui/lucide-icons'
import { Button, Stack, YStack } from 'tamagui'
import { Logo, Screen } from '@my/ui/src'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const signupLinkProps = useLink({ href: '/signup' })
  const loginLinkProps = useLink({ href: '/signin' })

  return (
    <Screen>
      <YStack f={1} alignItems="center" justifyContent="space-evenly">
        <Stack />
        <Logo />
        <YStack space="$6">
          <Button
            {...signupLinkProps}
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
            {...loginLinkProps}
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
