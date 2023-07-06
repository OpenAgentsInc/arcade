import { useNavigation } from "@react-navigation/native"
import { Header, Screen } from "app/components"
import { colors, spacing } from "app/theme"
import { useLayoutEffect, useState } from "react"
import { Platform, Text, TextStyle, View, ViewStyle } from "react-native"

export const TrainAI = () => {
  const navigation = useNavigation<any>()
  const [model, setModel] = useState("GPT-3.5")
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="AI Settings"
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])
  return (
    <Screen
      style={$root}
      preset="fixed"
      safeAreaEdges={["bottom"]}
      KeyboardAvoidingViewProps={{ behavior: Platform.OS === "ios" ? "padding" : "height" }}
      keyboardOffset={104}
    >
      <View style={$container}>
        <View style={$main}>
          <Text style={$settingHeading}>MODEL</Text>
          <View style={$settingContainer}>
            <View style={$settingBackground}>
              <Text style={$settingTitle}>GPT-3.5</Text>
              <Text style={$settingSubtitle}>The default model of ChatGPT</Text>
              <View style={$divider} />
            </View>
            <View style={$settingBackground}>
              <Text style={$settingTitle}>GPT-4</Text>
              <Text style={$settingSubtitle}>Smarter but slower</Text>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $settingHeading: TextStyle = {
  letterSpacing: 1,
  marginTop: 28,
  marginBottom: 10,
  marginLeft: 12,
  color: "#888",
  fontSize: 16,
}

const $settingTitle: TextStyle = {
  marginTop: 1,
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
}

const $settingSubtitle: TextStyle = {
  fontSize: 16,
  color: "#999",
  marginTop: 5,
}

const $settingContainer: ViewStyle = {
  backgroundColor: "#1c1c1e",
  paddingVertical: 12,
  paddingHorizontal: 14,
  borderRadius: 12,
}

const $divider: ViewStyle = {
  backgroundColor: "#3b3b3d",
  height: 1,
  marginVertical: 16,
}

const $settingBackground = {}

const $container: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
}

const $main: ViewStyle = {
  flex: 1,
}
