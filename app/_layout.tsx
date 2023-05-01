import { Slot, SplashScreen, Stack } from 'expo-router'
import { useCachedResources } from 'lib/hooks'
import { StatusBar, View } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { config } from '../tamagui.config'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <Slot />
      </Theme>
      <StatusBar barStyle="light-content" />
    </TamaguiProvider>
  )
}
