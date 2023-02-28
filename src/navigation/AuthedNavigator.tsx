import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRelayPool } from 'lib/nostr'
import { ConnectScreen } from 'views/connect/ConnectScreen'
import { FirstLoadScreen } from 'views/load/FirstLoadScreen'
import { ProfileScreen } from 'views/profile'
import { RelaysScreen } from 'views/relay/RelayTest'
import { NavHeader } from 'views/shared'

import { TabNavigator } from './TabNavigator'

export type AuthedStackParams = {
  firstload: undefined
  tabs: undefined
  profile: { pubkey: string }
  relays: undefined
  connect: undefined
}

const Stack = createNativeStackNavigator<AuthedStackParams>()

export function AuthedNavigator() {
  useRelayPool({ connectNow: true })
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      screenOptions={{
        header: ({ options }) => (
          <NavHeader options={options} title={options.title} />
        ),
      }}
    >
      <Stack.Screen
        name="firstload"
        component={FirstLoadScreen}
        options={{ title: 'Firstload', headerShown: false }}
      />
      <Stack.Screen
        name="tabs"
        component={TabNavigator}
        options={{ title: 'Chats', headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="relays"
        component={RelaysScreen}
        options={{ title: 'Relays' }}
      />
      <Stack.Screen
        name="connect"
        component={ConnectScreen}
        options={{ title: 'Connect' }}
      />
    </Stack.Navigator>
  )
}
