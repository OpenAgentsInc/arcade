import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'app/lib/useTheme'
import { Suspense } from 'react'
import { StatusBar } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'

import config from './tamagui.config'

export const Provider: FCC = ({ children }) => {
  const theme = useTheme()
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <StatusBar barStyle="light-content" />
      <Suspense>
        <Theme name="dark">
          <Theme name={theme}>
            <NavigationContainer>{children}</NavigationContainer>
          </Theme>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  )
}
