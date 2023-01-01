import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../features/home/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
}>()

export function UnauthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
