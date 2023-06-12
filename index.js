import "isomorphic-webcrypto"
import "text-encoding-polyfill"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("arcade", () => IgniteApp)

export default App
