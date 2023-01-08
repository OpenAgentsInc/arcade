import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChannelScreen, ChannelsScreen } from 'app/features/chat'
import { NavHeader } from 'app/views'
import React from 'react'

const Stack = createNativeStackNavigator<{
  channels: undefined
  channel: undefined
  settings: undefined
}>()

export function ChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="channels"
        component={ChannelsScreen}
        options={{
          title: 'Channels',
          animation: 'slide_from_right',
          header: ({ options }) => (
            <NavHeader options={options} title={options.title} />
          ),
        }}
      />
      <Stack.Screen
        name="channel"
        component={ChannelScreen}
        options={{
          animation: 'slide_from_right',
          header: ({ options }) => (
            <NavHeader options={options} title={options.title} />
          ),
        }}
      />
      {/* <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          header: ({ options: { title } }) => <NavHeader title={title} />,
          animation: 'slide_from_right',
        }}
      /> */}
    </Stack.Navigator>
  )
}
