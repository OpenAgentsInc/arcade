import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from 'lib/hooks/useUser'
import { Suspense } from 'react'
import { StatusBar } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'

import config from './tamagui.config'

const queryClient = new QueryClient()

export const Provider: FCC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TamaguiProvider config={config} defaultTheme="dark">
          <StatusBar barStyle="light-content" />
          <Suspense>
            <Theme name="dark">
              <Theme name="green">
                <NavigationContainer>{children}</NavigationContainer>
              </Theme>
            </Theme>
          </Suspense>
        </TamaguiProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
