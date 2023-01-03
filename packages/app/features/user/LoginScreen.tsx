import { BackButton, Screen } from 'app/views'
import { Card, H2, H4, H5, Input, isWeb, Paragraph, Stack, YStack } from '@my/ui'

export const LoginScreen = () => {
  return (
    <Screen>
      <BackButton />
      <YStack alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={isWeb ? '12%' : '10%'}>
          <H2>Login</H2>
          <Paragraph mt="$3" mb="$5" opacity={0.7}>
            Enter your account key to log in:
          </Paragraph>
          <Stack alignItems="center" width="100%">
            <Input placeholder="nsec1..." alignSelf="center" width={300} />
          </Stack>
        </YStack>
        <Card theme="yellow" w="100%" maxWidth={400} mt="$8">
          <Card.Header pt="$4" px="$4" pb="$2">
            <Paragraph fontWeight="700" fontSize="$3">
              Security warning
            </Paragraph>
          </Card.Header>
          <Card.Footer px="$4" pb="$4">
            <YStack space="$3">
              <Paragraph fontSize="$3" lineHeight={22}>
                Please do not use account keys from an app other than Arc.
              </Paragraph>
              <Paragraph fontSize="$3" lineHeight={22}>
                Arc is pre-alpha software and may be insecure.
              </Paragraph>
              <Paragraph fontSize="$3" lineHeight={22}>
                Only log in with keys you generated in Arc.
              </Paragraph>
            </YStack>
          </Card.Footer>
        </Card>
      </YStack>
    </Screen>
  )
}
