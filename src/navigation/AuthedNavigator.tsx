import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRelayPool } from 'app/lib/nostr'
import { RelaysScreen } from 'app/views/relay/RelayTest'
import { ProfileScreen } from 'views/profile'
import { NavHeader } from 'views/shared'

import { TabNavigator } from './TabNavigator'

export type AuthedStackParams = {
  tabs: undefined
  profile: { pubkey: string }
  relays: undefined
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
