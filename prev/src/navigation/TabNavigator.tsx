import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Globe, MessageCircle, Settings } from '@tamagui/lucide-icons'
import { XStack } from 'tamagui'
import { CreateChannelButton, DiscoverScreen } from 'views/chat'
import { NavHeader } from 'views/shared'
import { SettingsScreen } from 'views/user/SettingsScreen'

import { ChatNavigator } from './ChatNavigator'

const BottomTab = createBottomTabNavigator<{
  chat: undefined
  discover: undefined
  settings: undefined
}>()

const activeTabColor = '$color12'
const inactiveTabColor = '$color8'

export function TabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="chat"
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
        name="discover"
        component={DiscoverScreen}
        options={{
          headerShown: true,
          title: 'Discover',
          header: ({ options }) => (
            <NavHeader
              options={options}
              title={options.title}
              rightButton={<CreateChannelButton />}
            />
          ),
          tabBarIcon: ({ focused, size }) => (
            <Globe
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
