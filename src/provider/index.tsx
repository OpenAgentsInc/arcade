import { NavigationContainer } from '@react-navigation/native'
import { Suspense } from 'react'
import { StatusBar } from 'react-native'
import { TamaguiProvider } from 'tamagui'

import config from '../tamagui.config'

export const Provider: FCC = ({ children }) => {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <StatusBar barStyle="light-content" translucent />
      <Suspense>
        <NavigationContainer>{children}</NavigationContainer>
      </Suspense>
    </TamaguiProvider>
  )
}
