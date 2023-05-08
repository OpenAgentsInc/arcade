import 'lib/ignoreWarnings'
import { useCachedResources } from 'lib/hooks'
import { StatusBar } from 'react-native'
import { BlankScreen } from 'views/dev'

export const App = () => {
  useCachedResources()
  return (
    <>
      <BlankScreen />
      <StatusBar barStyle="light-content" />
    </>
  )
}
