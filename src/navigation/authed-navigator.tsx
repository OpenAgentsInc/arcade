import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MessageCircle, Settings } from '@tamagui/lucide-icons'
import { SettingsScreen } from 'app/features/user/SettingsScreen'
import { NavHeader } from 'app/views'
import { XStack } from 'tamagui'

import { ChatNavigator } from './chat-navigator'

const BottomTab = createBottomTabNavigator<{
  chat: undefined
  //   profile: undefined
  settings: undefined
}>()

const activeTabColor = '$color12'
const inactiveTabColor = '$color8'

export function AuthedNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="chat"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarBackground: () => (
          <XStack
            f={1}
            backgroundColor="$backgroundSoft"
            borderTopWidth="$1"
            borderTopColor="$color3"
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
