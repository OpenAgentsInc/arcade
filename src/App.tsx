import { useCachedResources } from 'lib/hooks'
import { RootNavigator } from 'navigation/RootNavigator'
import React, { Suspense } from 'react'
import { TamaguiProvider } from 'tamagui'
import { config } from '../tamagui.config'

export const App = () => {
  const loaded = useCachedResources()

  return (
    <TamaguiProvider config={config}>
      {/* if you want nice React 18 concurrent hydration, you'll want Suspense near the root */}
      <Suspense>{loaded ? <RootNavigator /> : null}</Suspense>
    </TamaguiProvider>
  )
}
