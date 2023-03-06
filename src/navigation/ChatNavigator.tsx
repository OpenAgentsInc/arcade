import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChannelScreen, ChannelsScreen } from 'views/chat'
import { CreateChannelButton } from 'views/chat/CreateChannelButton'
import { LeaveChannelButton } from 'views/chat/LeaveChannelButton'
import { NavHeader } from 'views/shared'

const Stack = createNativeStackNavigator<{
  // todo: fix the dupe w @types
  channels: undefined
  channel: { channel: any } // replace w actual model
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
            <NavHeader
              options={options}
              title={options.title}
              rightButton={<CreateChannelButton />}
            />
          ),
        }}
      />
      <Stack.Screen
        name="channel"
        component={ChannelScreen}
        options={{
          animation: 'slide_from_right',
          header: ({ options }) => (
            <NavHeader
              options={options}
              title={options.title}
              rightButton={<LeaveChannelButton />}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
