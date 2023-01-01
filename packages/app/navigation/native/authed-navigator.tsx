import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChannelScreen } from '../../features/channels/ChannelScreen'

const Stack = createNativeStackNavigator<{
  channels: undefined
  channel: undefined
}>()

export function AuthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="channels"
        component={ChannelScreen}
        options={{
          title: 'Channels',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="channel"
        component={ChannelScreen}
        options={{
          title: 'Channel',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  )
}
