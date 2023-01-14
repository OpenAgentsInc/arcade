import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRelayPool } from 'app/lib/nostr'
import { FirstLoadScreen } from 'app/views/load/FirstLoadScreen'
import { RelaysScreen } from 'app/views/relay/RelayTest'
import { ProfileScreen } from 'views/profile'
import { NavHeader } from 'views/shared'

import { TabNavigator } from './TabNavigator'

export type AuthedStackParams = {
  firstload: undefined
  tabs: undefined
  profile: { pubkey: string }
  relays: undefined
}

const Stack = createNativeStackNavigator<AuthedStackParams>()

export function AuthedNavigator() {
  useRelayPool({ connectNow: true })
  return (
    <Stack.Navigator
      initialRouteName="firstload"
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
    </Stack.Navigator>
  )
}
