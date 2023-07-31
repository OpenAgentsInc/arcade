import "text-encoding-polyfill"
import "react-native-url-polyfill/auto"
import "isomorphic-webcrypto"
import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"

/*
if (__DEV__) {
  require("basil-ws-flipper").wsDebugPlugin
}
*/

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("arcade", () => IgniteApp)

export default App
