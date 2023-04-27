import { BlankScreen } from 'views/dev'
import { MainFeedScreen } from 'views/feed/MainFeedScreen'
import { NotificationsScreen } from 'views/notifications/NotificationsScreen'
import { ProfileScreen } from 'views/profile/ProfileScreen'
import { UserProfileScreen } from 'views/profile/UserProfileScreen'
import { SettingsScreen } from 'views/settings/SettingsScreen'
import { TabBar } from 'views/shared'
import { WalletScreen } from 'views/wallet/WalletScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { hideHeaderOptions } from './navigation-utilities'
import { PostNavigator } from './PostNavigator'
import { stackOptions } from './stackOptions'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      initialRouteName="MainFeedScreen"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Messages"
        component={BlankScreen}
        options={stackOptions}
      />
      {/* <Tab.Screen
        name="MainFeedScreen"
        component={MainFeedScreen}
        options={stackOptions}
      /> */}
      <Tab.Screen
        name="Discover"
        component={BlankScreen}
        options={stackOptions}
        // options={hideHeaderOptions}
      />
      <Tab.Screen
        name="Contacts"
        component={BlankScreen}
        options={stackOptions}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={stackOptions}
      />
      {/* <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={hideHeaderOptions}
      /> */}
      {/* <Tab.Screen
        name="Notifications"
        component={BlankScreen}
        options={stackOptions}
      /> */}

      {/* <Tab.Screen
        name="PostNavigator"
        component={PostNavigator}
        options={hideHeaderOptions}
      /> */}
    </Tab.Navigator>
  )
}
