import * as React from 'react'
import { useState } from 'react'
import { useStore } from 'stores'
import { Card, H2, Input, isWeb, Paragraph, Stack, YStack } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { BackButton, Screen } from '@my/ui/src'

export const LoginScreen = () => {
  const loginWithNsec = useStore((s) => s.loginWithNsec)

  const [nsec, setNsec] = useState('')

  return (
    <Screen>
      <BackButton mt={40} ml={20} />
      <YStack px="$4" alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={isWeb ? '12%' : '15%'}>
          <H2>Login</H2>
          <Paragraph mt="$3" mb="$5" opacity={0.7}>
            Enter your account key to log in:
          </Paragraph>
          <Stack alignItems="center" width="100%">
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="nsec1..."
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
