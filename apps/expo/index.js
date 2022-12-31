// https://github.com/facebook/react-native/issues/14796#issuecomment-373961108
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

import { registerRootComponent } from 'expo'

import App from './App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
