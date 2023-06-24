import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { LinkPreview, Text } from "app/components"
import AutoHeightImage from "react-native-auto-height-image"
import { spacing } from "app/theme"

export function MessageContent({ content }) {
  return (
    <View style={$message}>
      <Text text={content.parsed} style={$messageContent} />
      {content.images.length > 0 &&
        content.images.map((image) => (
          <AutoHeightImage key={image} width={308} source={{ uri: image }} />
        ))}
      {content.links.length > 0 && <LinkPreview url={content.links[0]} />}
    </View>
  )
}

const $message: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignSelf: "stretch",
}

const $messageContent: TextStyle = {
  color: "#fff",
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
}
