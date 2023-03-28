import React from 'react'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    SourceCodePro_400Regular,
  })

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </Provider>
  )
}
