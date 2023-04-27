import 'lib/ignoreWarnings'
import { useCachedResources } from 'lib/hooks'
import { RootNavigator } from 'navigation/RootNavigator'
import React, { Suspense } from 'react'
import { StatusBar } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { BlankScreen } from 'views/dev'
import { config } from '../tamagui.config'

export const App = () => {
  const loaded = useCachedResources()

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <Suspense>{loaded ? <RootNavigator /> : <BlankScreen />}</Suspense>
      </Theme>
      <StatusBar barStyle="light-content" />
    </TamaguiProvider>
  )
}
