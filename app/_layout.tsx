import { Slot, SplashScreen, Stack } from 'expo-router'
import Head from 'expo-router/head'
import { useCachedResources } from 'lib/hooks/useCachedResources'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return (
      <>
        <Head>
          <title>Arcade</title>
          <meta name="description" content="Unstoppable chat" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <SplashScreen />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Arcade</title>
        <meta name="description" content="Unstoppable chat" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </>
  )
}
