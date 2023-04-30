import { Slot, SplashScreen } from 'expo-router'
import { useCachedResources } from 'lib/hooks/useCachedResources'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return <Slot />
}
