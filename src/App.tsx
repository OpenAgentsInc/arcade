import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { useCachedResources, useExpoUpdates } from 'lib/hooks'
import { useEffect, useMemo, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootStore, RootStoreProvider, setupRootStore } from 'stores/root-store'
import { Loading as LoadSplash } from 'views/loading'
import { Navigation } from './navigation'
import { Provider as PaperProvider } from 'react-native-paper'

export const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [ready, setReady] = useState(false)
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)

  useEffect(() => {
    ;(async () => {
      try {
        // await initFonts()
        const initStore = await setupRootStore(null)
        setRootStore(initStore)
        // await delay(500)
        setReady(true)
      } catch (e: any) {
        // notify(e)
        console.log(e)
      }
    })()
  }, [])

  const componentToRender = useMemo(() => {
    return !isLoadingComplete || !ready || !rootStore ? (
      <LoadSplash ready={false} />
    ) : (
      <PaperProvider>
        <RootStoreProvider value={rootStore}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </RootStoreProvider>
      </PaperProvider>
    )
  }, [isLoadingComplete, ready, rootStore])

  return (
    <>
      <StatusBar style='light' />
      <LoadSplash ready={isLoadingComplete} />
      {componentToRender}
    </>
  )
}
