import { useCachedResources } from 'lib/hooks'
import { RootNavigator } from 'navigation/RootNavigator'

export const App = () => {
  const loaded = useCachedResources()

  return loaded ? <RootNavigator /> : null
}
