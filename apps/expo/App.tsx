import 'text-encoding-polyfill'
import 'expo-dev-client'
import { useExpoUpdates } from 'app/lib/useExpoUpdates'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Alert, LogBox } from 'react-native'
import { useCachedResources } from './useCachedResources'

LogBox.ignoreLogs(['Constants.platform.ios.model', 'Require cycle', 'Warning, duplicate ID'])

export default function App() {
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)

  useEffect(() => {
    Alert.alert('Testing update - skipping useDatabase')
  }, [])

  if (!isLoadingComplete) {
    return null
  }
  return (
    <Provider>
      <StatusBar style="light" />
      <NativeNavigation />
    </Provider>
  )
}
