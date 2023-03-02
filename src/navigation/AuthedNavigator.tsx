import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ConnectScreen } from 'views/connect/ConnectScreen'
import { ProfileScreen } from 'views/profile'
import { NavHeader } from 'views/shared'

import { TabNavigator } from './TabNavigator'

export type AuthedStackParams = {
  tabs: undefined
  profile: { pubkey: string }
  connect: undefined
}

const Stack = createNativeStackNavigator<AuthedStackParams>()

export function AuthedNavigator() {
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
        name="connect"
        component={ConnectScreen}
        options={{ title: 'Connect' }}
      />
    </Stack.Navigator>
  )
}
