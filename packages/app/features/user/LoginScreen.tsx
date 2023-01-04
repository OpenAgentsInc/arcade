import { BackButton, Screen } from 'app/views'
import { Card, H2, H4, H5, Input, isWeb, LinearGradient, Paragraph, Stack, YStack } from '@my/ui'

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
        <Card
          theme="yellow"
          w="100%"
          maxWidth={400}
          mt="$8"
          elevate
          bordered
          //   bg="$backgroundTransparent"
        >
          <Card.Background>
            {/* <LinearGradient
              pos="absolute"
              colors={['$yellow', '$blue']}
              start={[1, 1]}
              end={[0, 0]}
              f={1}
            /> */}
          </Card.Background>
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
