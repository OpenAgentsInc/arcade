import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import Chat from "app/components/icons/chat.svg"
import Profile from "app/components/icons/profile.svg"
import Settings from "app/components/icons/settings.svg"
import { StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ContactsScreen, HomeMessagesScreen, ProfileScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

const logoSize = 30

export type DemoTabParamList = {
  Home: undefined
  Feed: undefined
  Create: undefined
  Contacts: undefined
  Profile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

const inactiveIconColor = colors.palette.cyan800

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          $tabBar,
          { height: bottom + 40, borderTopWidth: 1, borderColor: colors.palette.cyan800 },
        ],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ focused }) => (
            <Profile
              style={focused ? styles.logoActive : styles.logo}
              height={logoSize}
              width={logoSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeMessagesScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Chat
              style={focused ? styles.logoActive : styles.logo}
              height={logoSize}
              width={logoSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Settings
              style={focused ? styles.logoActive : styles.logo}
              height={logoSize}
              width={logoSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.separator, // colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

const styles = StyleSheet.create({
  // bottomBar: {
  //   alignItems: "center",
  //   backgroundColor: colors2.bottomBarBackground,
  //   borderColor: colors2.bottomBarBorder,
  //   borderRadius: 15,
  //   borderWidth: 1,
  //   flexDirection: "row",
  //   height: 60,
  //   justifyContent: "space-around",
  //   left: "5%",
  //   position: "absolute",
  //   width: "90%",
  // },
  // container: {
  //   backgroundColor: colors.black,
  //   flex: 1,
  // },
  // list: {
  //   flex: 1,
  //   marginTop: 40,
  //   paddingHorizontal: 2,
  //   paddingVertical: 10,
  // },
  logo: { color: inactiveIconColor },
  logoActive: { color: colors.tint },
})
