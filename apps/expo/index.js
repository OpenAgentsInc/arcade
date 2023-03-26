// registerRootComponent happens in "expo-router/entry"
import 'text-encoding-polyfill'
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Require cycle', 'No native'])
import 'expo-router/entry'

// yellowbox ignore warning
