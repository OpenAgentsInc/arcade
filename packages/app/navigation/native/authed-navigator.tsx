import { ChannelScreen, ChannelsScreen } from 'app/features/chat'
import { SettingsScreen } from 'app/features/user/SettingsScreen'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<{
  channels: undefined
  channel: undefined
  settings: undefined
}>()

export function AuthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="channels"
        component={ChannelsScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="channel"
        component={ChannelScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  )
}
