import Head from 'expo-router/head'
import { Text, YStack } from 'tamagui'

export default function () {
  return (
    <YStack f={1} jc="center" ai="center" bg="#000">
      <Head>
        <title>Arcade</title>
        <meta name="description" content="Unstoppable chat" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Text
        color="#fff"
        ff="Protomolecule"
        fontSize={60}
        textShadowColor="cyan"
        textShadowRadius={14}
      >
        arcaDE
      </Text>
    </YStack>
  )
}
