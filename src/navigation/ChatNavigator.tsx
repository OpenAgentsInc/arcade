import { Channel } from 'stores/chat'
import { ChannelScreen, ChannelsScreen } from 'views/chat'
import { NavHeader } from 'views/shared'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<{
  // todo: fix the dupe w @types
  channels: undefined
  channel: { channel: Channel }
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
          headerShown: false,
          // header: ({ options }) => (
          //   <NavHeader options={options} title={options.title} />
          // ),
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
    </Stack.Navigator>
  )
}
