import { MainFeedScreen } from 'views/feed/MainFeedScreen'
import { NotificationsScreen } from 'views/notifications/NotificationsScreen'
import { UserProfileScreen } from 'views/profile/UserProfileScreen'
import { TabBar } from 'views/shared'
import { WalletScreen } from 'views/wallet/WalletScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { hideHeaderOptions } from './navigation-utilities'
import { PostNavigator } from './PostNavigator'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      initialRouteName="MainFeedScreen"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="MainFeedScreen"
        component={MainFeedScreen}
        options={hideHeaderOptions}
      />
      <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={hideHeaderOptions}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={hideHeaderOptions}
      />
      <Tab.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={hideHeaderOptions}
      />
      <Tab.Screen
        name="PostNavigator"
        component={PostNavigator}
        options={hideHeaderOptions}
      />
    </Tab.Navigator>
  )
}
