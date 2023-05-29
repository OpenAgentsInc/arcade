import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, CityBackground, Screen, Spotlight, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { navigate } = useNavigation<any>()

  return (
    <Screen
      style={$root}
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$container}
    >
      <CityBackground />
      {/* <Spotlight /> */}
      <View>
        <Text text="arcaDE" preset="heading" style={$arcade} />
      </View>
      <View>
        <Button
          text="Enter"
          onPress={() => navigate("Login")}
          style={$mainButton}
          pressedStyle={$mainButton}
        />
        <Button
          text="Create Account"
          onPress={() => navigate("CreateAccount")}
          style={$button}
          pressedStyle={$button}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
}

const $arcade: TextStyle = {
  fontSize: 75,
  lineHeight: 100,
  letterSpacing: 4,
  marginTop: "55%",
  color: "white",
  textShadowColor: "#00ffff",
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 4,
  textAlign: "center",
  marginBottom: spacing.massive,
}

const $mainButton: ViewStyle = {
  backgroundColor: "black", // colors.palette.cyan500,
  borderWidth: 1,
  width: "100%",
  marginBottom: spacing.small,
  borderColor: colors.palette.cyan500,
}

const $button: ViewStyle = {
  backgroundColor: "black", // colors.palette.cyan900,
  borderColor: colors.palette.cyan900,
}
