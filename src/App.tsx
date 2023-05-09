import 'lib/ignoreWarnings'
import { useCachedResources } from 'lib/hooks'
import { AuthNavigator } from 'navigation/AuthNavigator'
import { MainNavigator } from 'navigation/MainNavigator'
import { RootNavigator } from 'navigation/RootNavigator'
import { StatusBar } from 'react-native'
import { BlankScreen, PlaceholderSplash } from 'views/dev'

export const App = () => {
  const loaded = useCachedResources()
  return (
    <>
      <StatusBar barStyle="light-content" />
      {loaded ? <RootNavigator /> : <BlankScreen />}
    </>
  )
}
