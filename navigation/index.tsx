import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import ChatRoomScreen from '../screens/Chatroom'
import ChatsScreen from '../screens/Chats'
import LoginScreen from '../screens/LoginScreen'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import TabBarIcon from '../components/TabBarIcon'

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Auth' component={AuthNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='Chats'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name='Chats'
        component={ChatsScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name='Chatroom'
        component={ChatRoomScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name='TabOne'
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Signing Test',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name='info-circle' size={25} color='white' style={{ marginRight: 15 }} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabOneScreen}
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

const AuthStack = createNativeStackNavigator<RootStackParamList>()

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  )
}
