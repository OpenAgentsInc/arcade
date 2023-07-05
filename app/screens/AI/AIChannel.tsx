import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { Header, Message, MessageInput, MessageType, Screen, SolidScreen } from "app/components"
import { colors, spacing } from "app/theme"
import { useLayoutEffect } from "react"
import { ListRenderItemInfo, View, ViewStyle } from "react-native"

export const AIChannel = ({ route }) => {
  const conversationId = route.params.id
  const { isLoading, messages } = useConversationMessages(conversationId)
  // const messages: MessageType[] = [
  //   {
  //     conversationId: "1234",
  //     from: "user" as "user",
  //     message: "Hello world",
  //     userId: "123",
  //     timestamp: new Date().toDateString(),
  //   },
  //   {
  //     conversationId: "1234",
  //     from: "faerie" as "faerie",
  //     message: "sup yo!!!!!",
  //     userId: "123",
  //     timestamp: new Date().toDateString(),
  //   },
  //   {
  //     conversationId: "1234",
  //     from: "user" as "user",
  //     message: "gimme ur money",
  //     userId: "123",
  //     timestamp: new Date().toDateString(),
  //   },
  //   {
  //     conversationId: "1234",
  //     from: "faerie" as "faerie",
  //     message: "no",
  //     userId: "123",
  //     timestamp: new Date().toDateString(),
  //   },
  // ].reverse()
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
          // rightIcon="Check"
          // rightIconColor={colors.palette.cyan400}
          // onRightPress={() => formikRef.current.submitForm()}
        />
      ),
    })
  }, [])
  // return <Screen contentContainerStyle={$root} preset="fixed"></Screen>
  return (
    <SolidScreen>
      <FlashList renderItem={renderItem} estimatedItemSize={150} data={messages} inverted />
      <MessageInput conversationId={conversationId} conversationType={"dialogue"} />
    </SolidScreen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}
