import { ProfileScreen } from 'app/features/profile'
import { XStack } from '@my/ui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MessageCircle, User } from '@tamagui/lucide-icons'
import { ChatNavigator } from './chat-navigator'

const BottomTab = createBottomTabNavigator<{
  chat: undefined
  profile: undefined
}>()

const activeTabColor = '$color11'
const inactiveTabColor = '$color8'

export function AuthedNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="profile"
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
            <MessageCircle color={focused ? activeTabColor : inactiveTabColor} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <User color={focused ? activeTabColor : inactiveTabColor} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
