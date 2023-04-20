import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabNavigator } from './TabNavigator'

const Stack = createNativeStackNavigator()

export function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="tabs">
      <Stack.Screen
        name="tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
