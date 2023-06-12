import React from "react"
import { StyleSheet } from "react-native"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import Chat from "app/components/icons/chat.svg"
import Profile from "app/components/icons/profile.svg"
import Settings from "app/components/icons/settings.svg"
import { ContactsScreen, HomeMessagesScreen, ProfileScreen } from "app/screens"
import { colors } from "app/theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { TabBar } from "./TabBar"

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
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

const inactiveIconColor = colors.palette.cyan800

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
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

const styles = StyleSheet.create({
  logo: { color: inactiveIconColor },
  logoActive: { color: colors.tint },
})
