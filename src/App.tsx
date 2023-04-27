import 'lib/ignoreWarnings'
import { useCachedResources, useTheme } from 'lib/hooks'
import { RootNavigator } from 'navigation/RootNavigator'
import React, { Suspense } from 'react'
import { StatusBar } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { BlankScreen } from 'views/dev'
import { config } from '../tamagui.config'

export const App = () => {
  const loaded = useCachedResources()
  const theme = useTheme()

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        {/* if you want nice React 18 concurrent hydration, you'll want Suspense near the root */}
        <Theme name={theme}>
          <Suspense>{loaded ? <RootNavigator /> : <BlankScreen />}</Suspense>
        </Theme>
      </Theme>
      <StatusBar barStyle="light-content" />
    </TamaguiProvider>
  )
}
