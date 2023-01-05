import { ProfileScreen } from 'app/features/profile'
import { XStack } from '@my/ui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BarChart, MessageCircle, User, UserCog } from '@tamagui/lucide-icons'
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
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarBackground: () => <XStack f={1} backgroundColor="$backgroundSoft" />,
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
