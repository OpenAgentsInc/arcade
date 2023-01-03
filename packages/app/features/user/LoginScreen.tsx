import { BackButton } from 'app/views'
import { H2, Input, Paragraph, Screen, Theme, YStack } from '@my/ui'

export const LoginScreen = () => {
  return (
    <Theme name="purple">
      <Screen>
        <BackButton />
        <YStack jc="center" alignItems="center">
          <YStack justifyContent="center" alignItems="center" maxWidth={800}>
            <H2>Login</H2>
            <Paragraph my="$4">Enter your account key to log in:</Paragraph>
            <Input placeholder="nsec1..." alignSelf="stretch" />
          </YStack>
        </YStack>
      </Screen>
    </Theme>
  )
}
