import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'
import { BackButton, Screen } from 'app/views'
import { useEffect, useState } from 'react'
import { Card, H2, Input, isWeb, LinearGradient, Paragraph, Stack, YStack } from '@my/ui'

export const LoginScreen = () => {
  const { connect } = useNostr()
  const loginWithNsec = useStore((s) => s.loginWithNsec)

  const connectem = async () => {
    connect(['wss://relay.nostr.ch', 'wss://arc1.arcadelabs.co'])
  }

  useEffect(() => {
    connectem()
  }, [])

  const [nsec, setNsec] = useState('')

  return (
    <Screen>
      <BackButton />
      <YStack alignItems="center" f={1}>
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
        <Card
          theme="yellow"
          w="100%"
          maxWidth={400}
          mt="$8"
          elevate
          bordered
          bg="$backgroundTransparent"
        >
          <LinearGradient
            pos="absolute"
            width="100%"
            height="100%"
            colors={['#794a09', '#996e03']}
            opacity={0.3}
            start={[1, 1]}
            end={[0, 0]}
          />
          <Card.Header pt="$3" px="$4" pb="$2">
            <Paragraph fontWeight="700" fontSize="$2">
              Security warning
            </Paragraph>
          </Card.Header>
          <YStack px="$4" pb="$4">
            <YStack space="$3">
              <Paragraph fontSize="$2" lineHeight={22}>
                Please do not use an account key from apps other than Arc.
              </Paragraph>
              <Paragraph fontSize="$2" lineHeight={22}>
                Arc is pre-alpha software and may be insecure.
              </Paragraph>
              <Paragraph fontSize="$2" lineHeight={22}>
                Only log in with keys you generated in Arc.
              </Paragraph>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </Screen>
  )
}
