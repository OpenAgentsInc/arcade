import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Inbox, MessageCircle, Settings } from '@tamagui/lucide-icons'
import { XStack } from 'tamagui'
import { DirectMessagesScreen } from 'views/dm/DirectMessagesScreen'
import { HomeFeed } from 'views/feed/HomeFeed'
import { NavHeader } from 'views/shared'
import { SettingsScreen } from 'views/user/SettingsScreen'

import { ChatNavigator } from './ChatNavigator'

const BottomTab = createBottomTabNavigator<{
  feed: undefined
  chat: undefined
  dms: undefined
  settings: undefined
}>()

const activeTabColor = '$color12'
const inactiveTabColor = '$color8'

export function TabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="dms"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <XStack
            f={1}
            backgroundColor="$backgroundSoft"
            borderTopWidth="$1"
            borderTopColor="$color4"
            elevation="$6"
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="feed"
        component={HomeFeed}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Home
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MessageCircle
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="dms"
        component={DirectMessagesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Inbox
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size }) => (
            <Settings
              color={focused ? activeTabColor : inactiveTabColor}
              size={size}
            />
          ),
          title: 'Settings',
          header: ({ options }) => (
            <NavHeader options={options} title={options.title} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
