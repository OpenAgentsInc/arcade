import { H2, H3, H4, Paragraph, Separator, Stack } from 'tamagui'

const video = {
  title: 'Securing the API',
  subtitle:
    'We securely authenticate a Nostr keypair with our new Laravel API. Enjoy 5+ hours of wrestling with nonces, x-only pubkeys, and PHP elliptic curve cryptography libraries.',
}

export const VideoInfo = () => {
  return (
    <Stack fg={1} px="$4" pt="$3">
      <H4 my="$2">{video.title}</H4>
      <Paragraph col="$color11">{video.subtitle}</Paragraph>
      <Separator my="$4" />
    </Stack>
  )
}
