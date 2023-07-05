import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { Header, Message, MessageInput, MessageType, Screen, SolidScreen } from "app/components"
import { useConversationMessages } from "app/hooks/useConversationMessages"
import { colors, spacing } from "app/theme"
import { useLayoutEffect } from "react"
import { ListRenderItemInfo, View, ViewStyle } from "react-native"

export const AIChannel = ({ route }) => {
  const conversationId = route.params.id
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
        />
      ),
    })
  }, [])
  return (
    <SolidScreen>
      <FlashList renderItem={renderItem} estimatedItemSize={150} data={messages} inverted />
      <MessageInput conversationId={conversationId} conversationType={"dialogue"} />
    </SolidScreen>
  )
}
