import 'text-encoding-polyfill'
import 'expo-dev-client'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Constants.platform.ios.model', 'Require cycle', 'Warning, duplicate ID'])

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      <StatusBar style="light" />
      <NativeNavigation />
    </Provider>
  )
}
