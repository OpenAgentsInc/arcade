import { Slot, SplashScreen, Stack } from 'expo-router'
import { useCachedResources } from 'lib/hooks'
import { StatusBar, View } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { BackgroundCanvas } from 'views/three/BackgroundCanvas'
import { config } from '../tamagui.config'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <View style={{ height: '100vh' }}>
      <Slot />
      <BackgroundCanvas />
    </View>
  )

  // return (
  //   <TamaguiProvider config={config}>
  //     <BackgroundCanvas />
  //     {/* <Slot /> */}
  //     {/* <Theme name="dark">
  //       <Slot />
  //     </Theme> */}
  //     <StatusBar barStyle="light-content" />
  //   </TamaguiProvider>
  // )
}
