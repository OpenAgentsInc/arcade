import { useNostr } from 'lib/hooks'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabNavigator } from './tab-navigator'
import { RootStackParamList } from './types'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  useNostr()
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
