import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
// import { useStores } from "app/models"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in navigation via hook
  const { navigate } = useNavigation<any>()

  return (
    <Screen
      style={$root}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$container}
    >
      <View>
        <Text text="arcaDe" preset="heading" style={$arcade} />
        <View>
          <Button text="Enter" onPress={() => navigate("Login")} style={$mainButton} />
          <Button text="Create Account" onPress={() => navigate("CreateAccount")} style={$button} />
        </View>
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
  justifyContent: "center",
  paddingHorizontal: spacing.medium,
}

const $arcade: TextStyle = {
  fontSize: 50,
  lineHeight: 100,
  letterSpacing: 4,
  color: "white",
  textShadowColor: "#00ffff",
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 15,
  textAlign: "center",
}

const $mainButton: ViewStyle = {
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  width: "100%",
  marginBottom: spacing.small,
}

const $button: ViewStyle = {
  backgroundColor: colors.palette.cyan900,
  borderColor: colors.palette.cyan500,
}
