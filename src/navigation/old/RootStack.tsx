import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainNavigator } from './MainNavigator'
import { hideHeaderOptions } from './navigation-utilities'

const Stack = createNativeStackNavigator()

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={hideHeaderOptions} initialRouteName="main">
      <Stack.Screen
        name="main"
        component={MainNavigator}
        options={hideHeaderOptions}
      />
    </Stack.Navigator>
  )
}
