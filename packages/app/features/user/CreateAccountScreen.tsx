import { BackButton, Screen } from 'app/views'
import { H2, Input, isWeb, Label, Paragraph, Stack, YStack } from '@my/ui'

export const CreateAccountScreen = () => {
  return (
    <Screen>
      <BackButton />
      <YStack jc="center" alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={isWeb ? '-20%' : '-40%'}>
          <H2 mb="$5">Create Account</H2>
          <YStack space="$4" alignItems="center" width={300}>
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
          </YStack>
        </YStack>
      </YStack>
    </Screen>
  )
}
