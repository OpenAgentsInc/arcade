import React, { useRef } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { LinkPreview, Text } from "app/components"
import AutoHeightImage from "react-native-auto-height-image"
import { spacing } from "app/theme"
import { Video, ResizeMode } from "expo-av"

export function MessageContent({ content }) {
  const video = useRef(null)

  return (
    <View style={$message}>
      <Text text={content.parsed} style={$messageContent} />
      {content.images.length > 0 &&
        content.images.map((image) => (
          <AutoHeightImage key={image} width={308} source={{ uri: image }} />
        ))}
      {content.videos.length > 0 &&
        content.videos.map((url) => (
          <Video
            key={url}
            ref={video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            source={{ uri: url }}
            style={$messageVideo}
          />
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

const $messageVideo: ViewStyle = {
  width: 308,
  height: 300,
}
