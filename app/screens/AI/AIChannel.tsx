import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { Header, Message, MessageInput, MessageType, Screen, SolidScreen } from "app/components"
import { useConversationMessages } from "app/hooks/useConversationMessages"
import { colors, spacing } from "app/theme"
import { randomUUID } from "isomorphic-webcrypto"
import { useLayoutEffect } from "react"
import { ListRenderItemInfo, Platform, View, ViewStyle } from "react-native"

export const AIChannel = ({ route }) => {
  const conversationId = route?.params?.id ?? randomUUID() // A new conversationId is generated if none is provided
  const { isLoading, messages } = useConversationMessages(conversationId)
  const navigation = useNavigation<any>()
  const renderItem = (info: ListRenderItemInfo<any>) => <Message {...info} />
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="AI Chat"
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
      safeAreaBackgroundColor={colors.palette.overlay20}
    >
      <View style={$container}>
        <View style={$main}>
          <FlashList renderItem={renderItem} estimatedItemSize={150} data={messages} inverted />
        </View>
        <View style={$form}>
          <MessageInput conversationId={conversationId} conversationType={"dialogue"} />
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

const $form: ViewStyle = {
  flexShrink: 0,
  paddingTop: spacing.small,
}
