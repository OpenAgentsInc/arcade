import 'text-encoding-polyfill'
import 'expo-dev-client'

import { useFonts } from 'expo-font'
import { Provider } from 'lib/tamagui'
import { FC } from 'react'
import { LogBox } from 'react-native'

import { NativeNavigation } from './navigation'

LogBox.ignoreLogs([
  'Constants.platform.ios.model',
  'Require cycle',
  'Warning, duplicate ID',
  'failed to connect',
])

const App: FC = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}

export default App
