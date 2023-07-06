import { useNavigation } from "@react-navigation/native"
import { Header, Screen } from "app/components"
import { colors, spacing } from "app/theme"
import { useLayoutEffect } from "react"
import { Platform, View, ViewStyle } from "react-native"

export const TrainAI = () => {
  const navigation = useNavigation<any>()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="AI Training"
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          rightIcon="Bot"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => navigation.navigate("TrainAI")}
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
          {/* <FlashList renderItem={renderItem} estimatedItemSize={150} data={messages} inverted /> */}
        </View>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
}

const $main: ViewStyle = {
  flex: 1,
  marginBottom: -11,
}
