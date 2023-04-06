import { BlankScreen } from 'views/dev'
import { ProfileScreen } from 'views/profile/ProfileScreen'
import { TabBar } from 'views/shared'
import { WalletScreen } from 'views/wallet/WalletScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { hideHeaderOptions } from './navigation-utilities'
import { stackOptions } from './stackOptions'
import { StreamNavigator } from './StreamNavigator'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      initialRouteName="inbox"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="inbox"
        component={StreamNavigator}
        options={hideHeaderOptions}
      />
      <Tab.Screen
        name="Contacts"
        component={BlankScreen}
        options={stackOptions}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={stackOptions}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={stackOptions}
      />
    </Tab.Navigator>
  )
}
