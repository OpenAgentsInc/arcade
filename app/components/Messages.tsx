import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { FlashList } from "@shopify/flash-list"
import { User } from "app/components/User"
import { useStores } from "app/models"
import { spacing } from "app/theme"

export function Messages() {
  const { channelStore } = useStores()
  const data = channelStore.messages;

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <View style={$messageItem}>
          <User pubkey={item.pubkey} />
          <View style={$messageContentWrapper}>
            <Text text={item.content} style={$messageContent} />
          </View>
        </View>
      )}
      estimatedItemSize={100}
      inverted={true}
    />
  )
}

const $messageItem: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
}

const $messageContentWrapper: ViewStyle = {
  paddingLeft: 48,
  marginTop: -24,
}

const $messageContent: TextStyle = {
  color: "#fff",
}
