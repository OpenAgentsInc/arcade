import { LoginScreen } from 'views/auth/LoginScreen'
import { CreateAccountScreen } from 'views/onboarding/CreateAccountScreen'
import { SplashScreen } from 'views/splash/SplashScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
    </Stack.Navigator>
  )
}
