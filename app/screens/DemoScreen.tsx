import { StatusBar, StyleSheet, TouchableOpacity, View, useWindowDimensions } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { colors } from "app/theme"
import { ActivityIndicator } from "app/components/ActivityIndicator"
import { Frame } from "app/components/Frame"
import { Header, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"

import { ArwesButton } from "app/components/ArwesButton"
import { ArwesTextInput } from "app/components/TextInput"

type DemoScreenProps = {
  children?: React.ReactNode
}

type ExpandedButtonProps = {
  onPress: () => void
  title: string
}

const ExpandedButton: React.FC<ExpandedButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.container}>
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.palette.cyan100,
    borderRadius: 20,
    borderWidth: 1,
    height: 60,
    justifyContent: "center",
    marginTop: 50,
    width: "80%",
  },
  text: {
    color: colors.palette.cyan500,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
})

const DemoScreen: React.FC<DemoScreenProps> = ({ children }) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Demo"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>{children}</View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.almostBlack,
    flex: 1,
    justifyContent: "center",
  },
})

const ActivityIndicatorScreenDemo: React.FC = () => {
  const [type, setType] = useState<"large" | "small">("large")
  return (
    <DemoScreen>
      <ActivityIndicator color={colors.palette.cyan400} type={type} />
      <ExpandedButton
        onPress={() => {
          setType((t) => (t === "large" ? "small" : "large"))
        }}
        title="Large / Small"
      />
    </DemoScreen>
  )
}

const FrameScreenDemo: React.FC = () => {
  const [visible, setVisible] = useState(true)

  return (
    <DemoScreen>
      <Frame color={colors.palette.cyan400} style={frameScreenStyles.frame} visible={visible} />
      <ExpandedButton
        onPress={() => {
          setVisible((v) => !v)
        }}
        title="Show / Hide"
      />
    </DemoScreen>
  )
}

const frameScreenStyles = StyleSheet.create({
  frame: {
    height: 100,
    width: 200,
  },
})

const ButtonDemoScreen: React.FC = () => {
  return (
    <DemoScreen>
      <ArwesButton
        onPress={() => {
          console.log("Button pressed")
        }}
        style={buttonDemoStyles.container}
      >
        <Text style={buttonDemoStyles.text}>Arcade</Text>
      </ArwesButton>
    </DemoScreen>
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

const TextInputDemoScreen: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions()
  const textInputHeight = 60
  const textInputFontSize = 16
  return (
    <DemoScreen>
      <ArwesTextInput
        style={{
          width: windowWidth * 0.9,
          maxWidth: windowWidth * 0.9,
          height: textInputHeight,
        }}
        defaultValue="Type here..."
        internalSquareSize={15}
        textInputStyle={{
          fontSize: textInputFontSize,
        }}
      />
    </DemoScreen>
  )
}

export {
  DemoScreen,
  ActivityIndicatorScreenDemo,
  FrameScreenDemo,
  ButtonDemoScreen,
  TextInputDemoScreen,
}
