import 'text-encoding-polyfill'
import 'expo-dev-client'
import { useExpoUpdates } from 'app/lib/useExpoUpdates'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Alert, LogBox } from 'react-native'
import { useCachedResources } from './useCachedResources'

LogBox.ignoreLogs(['Constants.platform.ios.model', 'Require cycle', 'Warning, duplicate ID'])

export default function App() {
  //   const [ready, setReady] = useState(false)
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)

  if (!isLoadingComplete) {
    // Alert.alert('Not done loading resources')
    return null
  } else {
    // Alert.alert('Done loading resources')
  }

  return (
    <Provider>
      <StatusBar style="light" />
      <NativeNavigation />
    </Provider>
  )
}
