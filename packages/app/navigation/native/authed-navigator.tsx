import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChannelsScreen } from '../../features/chat/ChannelsScreen'

const Stack = createNativeStackNavigator<{
  channels: undefined
  channel: undefined
}>()

export function AuthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="channels"
        component={ChannelsScreen}
        options={{
          title: 'Channels',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="channel"
        component={ChannelsScreen}
        options={{
          title: 'Channel',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  )
}
