import { useCachedResources } from 'lib/hooks'
import { RootNavigator } from 'navigation/RootNavigator'
import React, { Suspense } from 'react'
import { TamaguiProvider, Theme } from 'tamagui'
import { config } from '../tamagui.config'

export const App = () => {
  const loaded = useCachedResources()

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        {/* if you want nice React 18 concurrent hydration, you'll want Suspense near the root */}
        <Suspense>{loaded ? <RootNavigator /> : null}</Suspense>
      </Theme>
    </TamaguiProvider>
  )
}
