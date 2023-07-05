import { ListRenderItemInfo } from "@shopify/flash-list"
import FastImage from "react-native-fast-image"
import { View } from "react-native"
// import { Paragraph, XStack, YStack } from 'tamagui'
// import { images } from "views/shared"
import { AnimatedTyping } from "./AnimatedTyping"

import { CopyButton } from "./CopyButton"
import { Text } from "../Text"
import { images } from "app/theme"

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
  // const img = "https://placekitten.com/200/200"
  const img = fromUser ? images.face : images.faerie
  const loading = item.message === "LOADING"

  // console.log(item)

  // If this message is more than 30 seconds old... (this is messed up now for some reason)
  const timestamp = new Date(item.timestamp)
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const seconds = diff / 1000
  // console.log("seconds:", seconds)

  const MessageComponent =
    fromUser || seconds > 2
      ? () => (
          <Text style={{ paddingLeft: 20, paddingRight: 28, fontSize: 16, color: "#fff" }}>
            {item.message}
          </Text>
        )
      : () => (
          <Text style={{ paddingLeft: 20, paddingRight: 28, fontSize: 16, color: "#fff" }}>
            {item.message}
          </Text>
        )
  // () => (
  //   <View style={{ width: "100%", flex: 1 }}>
  //     <AnimatedTyping text={item.message} />
  //   </View>
  // )

  return (
    <View
      key={index}
      style={{
        flexDirection: "row",
        backgroundColor: loading ? "#000" : backgroundColor,
        paddingVertical: 18,
        paddingLeft: 14,
        paddingRight: 20,
      }}
    >
      <FastImage
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#000",
        }}
        source={img}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View>
        {loading ? (
          <View style={{ width: "100%", paddingVertical: 8, paddingHorizontal: 16 }}>
            <FastImage
              style={{
                width: 54,
                height: 38,
                marginTop: -16,
              }}
              source={images.typing}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        ) : (
          <View style={{ width: "100%" }}>
            <MessageComponent />
          </View>
        )}

        {/* {!fromUser && !loading && <CopyButton message={item.message} />} */}
      </View>
    </View>
  )
}
