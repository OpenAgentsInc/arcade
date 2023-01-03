import { BackButton, Screen } from 'app/views'
import { H2, Input, isWeb, Paragraph, Stack, YStack } from '@my/ui'

export const LoginScreen = () => {
  return (
    <Screen>
      <BackButton />
      <YStack jc="center" alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={isWeb ? '-20%' : '-80%'}>
          <H2>Login</H2>
          <Paragraph mt="$3" mb="$5" opacity={0.7}>
            Enter your account key to log in:
          </Paragraph>
          <Stack alignItems="center" width="100%">
            <Input autoFocus placeholder="nsec1..." alignSelf="center" width={300} />
          </Stack>
        </YStack>
      </YStack>
    </Screen>
  )
}
