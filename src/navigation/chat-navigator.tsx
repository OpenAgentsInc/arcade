import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavButton } from './nav-button'
import { stackOptions } from './stackOptions'
import { ChatStackParamList } from './types'
import { DemoChannel } from 'views/chat/screens/DemoChannel'
import ChatsScreen from 'views/chat/old/Chats'

const Stack = createNativeStackNavigator<ChatStackParamList>()

export const ChatNavigator = () => {
  const navigation = useNavigation()

  return (
    <Stack.Navigator initialRouteName='chathome'>
      <Stack.Screen
        name='chathome'
        component={ChatsScreen}
        options={{ ...stackOptions, title: 'Channels', headerShown: false }}
      />
      <Stack.Screen
        name='channel'
        component={DemoChannel}
        options={{
          ...stackOptions,
          title: 'Channel',
          headerLeft: () => <NavButton onPress={navigation.goBack} />,
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  )
}
