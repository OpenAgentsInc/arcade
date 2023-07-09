import { ListRenderItemInfo } from "@shopify/flash-list"
import FastImage from "react-native-fast-image"
import { View, StyleSheet } from "react-native"
import React from "react"

import { Text } from "../Text"
import { colors, images } from "app/theme"

export type MessageType = {
  conversationId: string
  sender: "user" | "faerie"
  message: string
  timestamp: string
  userId: string
}

export const Message = ({ item, index }: ListRenderItemInfo<MessageType>) => {
  const fromUser = !item.sender || item.sender === "user"
  const backgroundColor = fromUser ? "transparent" : "#1C1C1D"
  const img = fromUser ? images.face : images.faerie
  const loading = item.message === "LOADING"

  const timestamp = new Date(item.timestamp)
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const seconds = diff / 1000

  const MessageComponent =
    fromUser || seconds > 2 ? (
      <Text style={styles.messageText}>{item.message}</Text>
    ) : (
      <Text style={styles.messageText}>{item.message}</Text>
    )

  return (
    <View
      key={index}
      style={[
        styles.messageContainer,
        { backgroundColor: loading ? colors.palette.black : backgroundColor },
      ]}
    >
      <FastImage style={styles.image} source={img} resizeMode={FastImage.resizeMode.contain} />
      <View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <FastImage
              style={styles.loadingImage}
              source={images.typing}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        ) : (
          <View style={styles.fillWidth}>{MessageComponent}</View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fillWidth: {
    width: "100%",
  },
  image: {
    borderColor: colors.palette.black,
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    width: 30,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  loadingImage: {
    height: 38,
    marginTop: -16,
    width: 54,
  },
  messageContainer: {
    backgroundColor: colors.black,
    flexDirection: "row",
    paddingLeft: 14,
    paddingRight: 20,
    paddingVertical: 18,
  },
  messageText: {
    color: colors.palette.white,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 28,
  },
})
