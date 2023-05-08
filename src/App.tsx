import 'lib/ignoreWarnings'
import { useCachedResources } from 'lib/hooks'
import { StatusBar } from 'react-native'
import { BlankScreen, PlaceholderSplash } from 'views/dev'

export const App = () => {
  const loaded = useCachedResources()
  return (
    <>
      <StatusBar barStyle="light-content" />
      {loaded ? <PlaceholderSplash /> : <BlankScreen />}
    </>
  )
}
