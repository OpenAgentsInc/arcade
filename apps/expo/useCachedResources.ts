import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  // Load any resources or data that we need prior to rendering the app
  // Todo: refactor this to not hide splashscreen until fonts are also loaded via useFonts
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        setTimeout(() => {
          SplashScreen.hideAsync()
        }, 500)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete && loaded
}
