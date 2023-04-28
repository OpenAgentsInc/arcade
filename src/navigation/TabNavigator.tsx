import { BlankScreen } from 'views/dev'
import { MainFeedScreen } from 'views/feed/MainFeedScreen'
import { NotificationsScreen } from 'views/notifications/NotificationsScreen'
import { ProfileScreen } from 'views/profile/ProfileScreen'
import { UserProfileScreen } from 'views/profile/UserProfileScreen'
import { SettingsScreen } from 'views/settings/SettingsScreen'
import { TabBar } from 'views/shared'
import { WalletScreen } from 'views/wallet/WalletScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ChatNavigator } from './ChatNavigator'
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
        name="Contacts"
        component={BlankScreen}
        options={stackOptions}
      />
      <Tab.Screen
        name="Chats"
        component={ChatNavigator}
        options={stackOptions}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={stackOptions}
      />
    </Tab.Navigator>
  )
}
