import React, { useContext } from 'react'
import { Pressable } from 'react-native'
import { ChannelScreen } from 'views/chat/ChannelScreen'
import { ChatHome } from 'views/chat/ChatHome'
import { palette } from 'views/theme'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavButton } from './nav-button'
import { stackOptions } from './stackOptions'

const Stack = createNativeStackNavigator()

export const ChatNavigator = () => {
  const navigation = useNavigation()

  return (
    <Stack.Navigator initialRouteName='chathome'>
      <Stack.Screen
        name='chathome'
        component={ChatHome}
        options={{ ...stackOptions, title: 'Channels' }}
      />
      <Stack.Screen
        name='channel'
        component={ChannelScreen}
        options={{
          ...stackOptions,
          title: 'Channel',
          headerLeft: () => <NavButton onPress={navigation.goBack} />,
          // headerRight: () => (
          //   <Pressable
          //     // onPress={demoUpdateMetadata}
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name='info-circle'
          //       size={25}
          //       color={palette.moonRaker}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        }}
      />
      {/* <Stack.Screen name='profile' component={Profile} options={stackOptions} /> */}
    </Stack.Navigator>
  )
}
