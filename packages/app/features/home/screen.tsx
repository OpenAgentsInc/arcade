import { Screen } from 'app/views'
import { useLink } from 'solito/link'
import { Button, Image, Stack, YStack } from 'tamagui'
import { palette } from '@my/ui'
import { Key, UserPlus } from '@tamagui/lucide-icons'
import { logo } from './logo'

export function HomeScreen() {
  const createLinkProps = useLink({ href: '/create' })
  const loginLinkProps = useLink({ href: '/login' })
  return (
    <Screen>
      <YStack f={1} alignItems="center" justifyContent="space-evenly">
        <Stack />
        <Image src={logo} width={200} height={200} mt={-60} />
        <YStack space="$6">
          <Button
            {...createLinkProps}
            als="center"
            icon={UserPlus}
            size="$5"
            focusStyle={{ opacity: 0.9, borderWidth: 0 }}
            shadowColor={palette.portGore}
            shadowRadius={8}
            shadowOpacity={0.3}
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
            shadowColor={palette.portGore}
            focusStyle={{ opacity: 0.9, borderWidth: 0 }}
            shadowRadius={8}
            shadowOpacity={0.1}
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
