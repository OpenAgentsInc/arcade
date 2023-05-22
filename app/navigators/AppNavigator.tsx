/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
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
import { DemoNavigator } from "./DemoNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
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
  Feed: undefined
  Channels: undefined
  User: undefined
  Profile: undefined
  EditProfile: undefined
  Nearby: undefined
  Demos: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
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
          <Stack.Screen name="Nearby" component={Screens.NearbyScreen} />
          <Stack.Screen name="Feed" component={Screens.FeedScreen} />
          <Stack.Screen name="Channels" component={Screens.ChannelsScreen} />
          <Stack.Screen name="User" component={Screens.UserScreen} />
          <Stack.Screen name="EditProfile" component={Screens.EditProfileScreen} />
          <Stack.Screen name="Demos" component={DemoNavigator} />
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
