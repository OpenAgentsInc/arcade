import { ProfileScreen } from 'app/features/profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BarChart, MessageCircle, User, UserCog } from '@tamagui/lucide-icons'
import { ChatNavigator } from './chat-navigator'

const BottomTab = createBottomTabNavigator<{
  chat: undefined
  profile: undefined
}>()

export function AuthedNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
      }}
    >
      <BottomTab.Screen
        name="chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </BottomTab.Navigator>
  )
}
