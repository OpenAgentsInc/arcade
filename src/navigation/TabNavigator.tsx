import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { hideHeaderOptions } from './navigation-utilities'
import { StreamNavigator } from './StreamNavigator'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="inbox" detachInactiveScreens={false}>
      <Tab.Screen
        name="inbox"
        component={StreamNavigator}
        options={hideHeaderOptions}
      />
    </Tab.Navigator>
  )
}
