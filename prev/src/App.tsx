import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values'
import 'text-encoding-polyfill'
import 'expo-dev-client'

import { useFonts } from 'expo-font'
import { Provider } from 'lib/provider'
import { FC } from 'react'
import { LogBox } from 'react-native'
import PolyfillCrypto from 'react-native-webview-crypto'

import { NativeNavigation } from './navigation'

LogBox.ignoreLogs([
  'Constants.platform.ios.model',
  'Require cycle',
  'Warning, duplicate ID',
  'failed to connect',
  'Sending `onAnimatedValueUpdate`',
  'fontFamily',
  '(ADVICE) Vie',
  'Failed prop type: Invalid',
  'Axios',
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
      <PolyfillCrypto />
    </Provider>
  )
}

export default App
