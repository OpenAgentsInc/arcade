import * as React from 'react'
import { useStore } from 'stores'
import { H2, Input, isWeb, Paragraph, Stack, YStack } from 'tamagui'
import { BackButton, Screen } from 'views/shared'

export const LoginScreen = () => {
  const loginWithNsec = useStore((s) => s.loginWithNsec)

  const [nsec, setNsec] = React.useState('')

  return (
    <Screen preset="fixed">
      <BackButton mt={40} ml={20} />
      <YStack px="$4" alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={isWeb ? '12%' : '15%'}>
          <H2>Login</H2>
          <Paragraph mt="$3" mb="$5" opacity={0.7}>
            Enter your access key:
          </Paragraph>
          <Stack alignItems="center" width="100%">
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="nsec1..."
              spellCheck={false}
              alignSelf="center"
              width={300}
              value={nsec}
              onChangeText={(text) => {
                setNsec(text)
                loginWithNsec(text)
              }}
            />
          </Stack>
        </YStack>
      </YStack>
    </Screen>
  )
}
