import { Database } from 'app/lib/Database'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  //   const [database, setDatabase] = useState<Database>()

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Initialize the database
        // const db = new Database()
        // setDatabase(db)

        // Wait for the database to finish initializing before marking the resources as loaded
        // await db.initialized()

        // console.log('Database initialized')
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

  return isLoadingComplete && loaded // && database
}
