import { ChannelScreen, ChannelsScreen } from 'app/features/chat'
import { SettingsScreen } from 'app/features/user/SettingsScreen'
import { NavHeader } from 'app/views'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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
          header: ({ options: { title } }) => <NavHeader title={title} />,
        }}
      />
      <Stack.Screen
        name="channel"
        component={ChannelScreen}
        options={{
          animation: 'slide_from_right',
          header: (props) => <NavHeader {...props} />,
          //   tabBarOptions: {
          //     style: {
          //       display: 'none',
          //     },
          //   },
        }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          header: ({ options: { title } }) => <NavHeader title={title} />,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  )
}
