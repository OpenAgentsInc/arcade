import { ChannelScreen } from 'views/chat/channel-screen'
import { StreamHome } from 'views/chat/stream-home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { stackOptions } from './stackOptions'
import { StreamNavigatorParamList } from './types'

const Stack = createNativeStackNavigator<StreamNavigatorParamList>()

export const StreamNavigator = () => (
  <Stack.Navigator initialRouteName="streamhome">
    <Stack.Screen
      name="streamhome"
      component={StreamHome}
      options={stackOptions}
    />
    <Stack.Screen
      name="ChannelScreen"
      component={ChannelScreen}
      options={stackOptions}
    />
    {/* <Stack.Screen name='ChannelList' component={ChannelListScreen} /> */}
  </Stack.Navigator>
)
