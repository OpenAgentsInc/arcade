import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CreateAccountScreen, HomeScreen, LoginScreen, SkiaDemoScreen } from "app/screens"

export type AuthStackParamList = {
  Home: undefined
  Login: undefined
  CreateAccount: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={SkiaDemoScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Stack.Navigator>
  )
}
