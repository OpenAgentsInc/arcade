import { ArwesButton, Text } from "app/components"
import { DemoContainerScreen } from "./DemoScreenContainer"
import { colors } from "app/theme"
import React from "react"
import { StyleSheet } from "react-native"

const ButtonDemoScreen: React.FC = () => {
  return (
    <DemoContainerScreen>
      <ArwesButton
        onPress={() => {
          console.log("Button pressed")
        }}
        style={buttonDemoStyles.container}
      >
        <Text style={buttonDemoStyles.text}>Arcade</Text>
      </ArwesButton>
    </DemoContainerScreen>
  )
}

const buttonDemoStyles = StyleSheet.create({
  container: { alignItems: "center", height: 60, justifyContent: "center", width: 200 },
  text: {
    color: colors.palette.neutral100,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
})

export { ButtonDemoScreen }
