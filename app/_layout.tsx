import { Slot, SplashScreen, Stack } from 'expo-router'
import { useCachedResources } from 'lib/hooks/useCachedResources'
import { Header } from 'views/web/Header'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Header />
      <Slot />
    </Stack>
  )
}
