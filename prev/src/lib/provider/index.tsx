import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'lib/hooks'
import { Suspense } from 'react'
import { StatusBar } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'

import config from './tamagui.config'

const queryClient = new QueryClient()

export const Provider: FCC = ({ children }) => {
  const theme = useTheme()
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
