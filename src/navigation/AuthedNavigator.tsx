import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileScreen } from 'views/profile'

import { TabNavigator } from './TabNavigator'

export type AuthedStackParams = {
  tabs: undefined
  profile: { pubkey: string }
}

const Stack = createNativeStackNavigator<AuthedStackParams>()

export function AuthedNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="tabs"
        component={TabNavigator}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  )
}
