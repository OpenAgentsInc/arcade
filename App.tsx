import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'

// import Navigation from './navigation'
import { DemoChannel } from 'views/chat/screens/DemoChannel'
import { useCachedResources } from 'lib/hooks'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          {/* <Navigation /> */}
          <DemoChannel />
          <StatusBar style='light' />
        </SafeAreaProvider>
      </PaperProvider>
    )
  }
}
