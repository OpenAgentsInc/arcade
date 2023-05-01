import { Slot, SplashScreen, Stack } from 'expo-router'
import { useCachedResources } from 'lib/hooks'
import { StatusBar } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { BackgroundCanvas } from 'views/three/BackgroundCanvas'
import { config } from '../tamagui.config'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <TamaguiProvider config={config}>
      <BackgroundCanvas />
      {/* <Theme name="dark">
        <Slot />
      </Theme> */}
      <StatusBar barStyle="light-content" />
    </TamaguiProvider>
  )
}
