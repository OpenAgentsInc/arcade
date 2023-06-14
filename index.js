import "text-encoding-polyfill"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import PolyfillCrypto from 'react-native-webview-crypto'

function IgniteApp() {
  return <View><PolyfillCrypto /><App hideSplashScreen={RNBootSplash.hide} /></View>
}

AppRegistry.registerComponent("arcade", () => IgniteApp)

export default App
