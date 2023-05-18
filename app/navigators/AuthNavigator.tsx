import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CreateAccountScreen, LoginScreen } from "app/screens"

export type AuthStackParamList = {
  Login: undefined
  CreateAccount: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()
export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Stack.Navigator>
  )
}
