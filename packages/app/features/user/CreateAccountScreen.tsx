import { BackButton, Screen } from 'app/views'
import { Button, H2, Input, isWeb, Label, YStack } from '@my/ui'
import { ChevronsRight } from '@tamagui/lucide-icons'

export const CreateAccountScreen = () => {
  return (
    <Screen>
      <BackButton />
      <YStack alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={isWeb ? '15%' : '5%'}>
          <H2 mb="$4">Create Account</H2>
          <YStack space="$3" alignItems="center" width={300}>
            <YStack width="100%">
              <Label htmlFor="username" alignSelf="flex-start" width="100%">
                Username
              </Label>
              <Input id="username" autoFocus placeholder="satoshi" width="100%" />
            </YStack>

            <YStack width="100%">
              <Label htmlFor="displayname" alignSelf="flex-start" width="100%">
                Display Name
              </Label>
              <Input id="displayname" placeholder="Satoshi Nakamoto" width="100%" />
            </YStack>

            <YStack width="100%">
              <Label htmlFor="about" alignSelf="flex-start" width="100%">
                About
              </Label>
              <Input id="about" placeholder="Creator(s) of Bitcoin." width="100%" />
            </YStack>
            <Button size="$5" mt="$6" w="100%" iconAfter={ChevronsRight}>
              Create
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Screen>
  )
}
