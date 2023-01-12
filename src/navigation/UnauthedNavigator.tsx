import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DatabaseTest } from 'app/views/dev/DatabaseTest'
import { RelayTest } from 'views/dev/RelayTest'
import { HomeScreen } from 'views/home/screen'
import { CreateAccountScreen } from 'views/user/CreateAccountScreen'
import { LoginScreen } from 'views/user/LoginScreen'

const Stack = createNativeStackNavigator<{
  create: undefined
  home: undefined
  login: undefined
}>()

export function UnauthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={DatabaseTest}
        // component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create"
        component={CreateAccountScreen}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  )
}
