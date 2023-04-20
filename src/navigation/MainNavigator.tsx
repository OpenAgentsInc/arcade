import { AddCommentScreen } from 'views/feed/AddCommentScreen'
import { PostDetailScreen } from 'views/feed/PostDetailScreen'
import { NotificationsScreen } from 'views/notifications/NotificationsScreen'
import { ProfileScreen } from 'views/profile/ProfileScreen'
import { UserProfileScreen } from 'views/profile/UserProfileScreen'
import { WalletScreen } from 'views/wallet/WalletScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { stackOptions } from './stackOptions'
import { TabNavigator } from './TabNavigator'

const Stack = createNativeStackNavigator()

export const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{ title: 'Post Details' }}
      />
      <Stack.Screen
        name="AddCommentScreen"
        component={AddCommentScreen}
        options={{ title: 'Add Comment' }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        // options={{ title: 'User Profile' }}
        options={stackOptions}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: 'User Profile' }}
      />
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={stackOptions}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  )
}
