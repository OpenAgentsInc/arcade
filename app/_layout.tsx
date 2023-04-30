import { Slot, SplashScreen } from 'expo-router'
import Head from 'expo-router/head'
import { useCachedResources } from 'lib/hooks/useCachedResources'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <>
      <Head>
        <title>Arcade</title>
        <meta name="description" content="Unstoppable chat" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Slot />
    </>
  )
}
