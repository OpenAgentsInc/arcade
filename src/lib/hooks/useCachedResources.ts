import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { fonts } from 'views/theme'
import {
    Inter_400Regular, Inter_700Bold, useFonts
} from '@expo-google-fonts/inter'
import { Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend'
import {
    TitilliumWeb_400Regular, TitilliumWeb_700Bold, TitilliumWeb_900Black
} from '@expo-google-fonts/titillium-web'
import { FontAwesome } from '@expo/vector-icons'

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Lexend_400Regular,
    Lexend_700Bold,
    TitilliumWeb_400Regular,
    TitilliumWeb_700Bold,
    TitilliumWeb_900Black,
  })

  const [interLoaded] = Font.useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const [protomoleculeLoaded] = Font.useFonts({
    Protomolecule: fonts.protomolecule,
  })

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete && loaded && interLoaded && protomoleculeLoaded
}
