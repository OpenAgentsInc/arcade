import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'

import { Navigation } from 'navigation/index'
import { DemoChannel } from 'views/chat/screens/DemoChannel'
import { useCachedResources } from 'lib/hooks'
import { Text } from 'react-native'
import { typography } from 'views/theme'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          {/* <Text style={{ margin: 30, fontFamily: typography.bold }}>TEST</Text> */}
          <Navigation />
          {/* <DemoChannel /> */}
          <StatusBar style='light' />
        </SafeAreaProvider>
      </PaperProvider>
    )
  }
}
