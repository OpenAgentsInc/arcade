import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { TabNavigator } from "./TabNavigator"
import { AuthNavigator } from "./AuthNavigator"
import { useStores } from "app/models"

export type AppStackParamList = {
  Auth: undefined
  Home: undefined
  Login: undefined
  CreateAccount: undefined
  Tabs: undefined
  HomeMessages: undefined
  Discover: undefined
  Chat: undefined
  Listing: undefined
  ListingDetail: undefined
  Channels: undefined
  User: undefined
  Profile: undefined
  EditProfile: undefined
  CascadeDemo: undefined
  DirectMessage: undefined
  CreateChannel: undefined
  ContactPicker: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    userStore: { isLoggedIn },
  } = useStores()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Chat" component={Screens.ChatScreen} />
          <Stack.Screen name="Listing" component={Screens.ListingScreen} />
          <Stack.Screen name="ListingDetail" component={Screens.ListingDetailScreen} />
          <Stack.Screen name="Channels" component={Screens.ChannelsScreen} />
          <Stack.Screen name="CreateChannel" component={Screens.CreateChannelScreen} />
          <Stack.Screen name="User" component={Screens.UserScreen} />
          <Stack.Screen name="EditProfile" component={Screens.EditProfileScreen} />
          <Stack.Screen name="CascadeDemo" component={Screens.CascadeDemo} />
          <Stack.Screen name="DirectMessage" component={Screens.DirectMessageScreen} />
          <Stack.Screen name="ContactPicker" component={Screens.ContactPickerScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
