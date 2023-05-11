import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ChatScreen, HomeMessagesScreen } from "app/screens"

export type HomeNavigatorParamList = {
  HomeMessages: undefined
  Chat: undefined
}

const Stack = createNativeStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="HomeMessages" component={HomeMessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  )
}
