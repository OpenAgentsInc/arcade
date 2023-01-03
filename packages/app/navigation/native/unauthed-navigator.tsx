import { HomeScreen } from 'app/features/home/screen'
import { CreateAccountScreen } from 'app/features/user/CreateAccountScreen'
import { LoginScreen } from 'app/features/user/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<{
  create: undefined
  home: undefined
  login: undefined
}>()

export function UnauthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="create"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
