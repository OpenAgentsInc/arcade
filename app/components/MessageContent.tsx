import React, { useCallback, useRef, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { LinkPreview, Text } from "app/components"
import AutoHeightImage from "react-native-auto-height-image"
import { spacing } from "app/theme"
import { Video, ResizeMode } from "expo-av"

export function MessageContent({ content }) {
  const [width, setWidth] = useState(null)
  const video = useRef(null)

  const onLayout = useCallback((event) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  return (
    <View style={$message} onLayout={onLayout}>
      <Text text={content.parsed} style={$messageContent} />
      {width &&
        content.images.length > 0 &&
        content.images.map((image) => (
          <AutoHeightImage key={image} width={width} source={{ uri: image }} />
        ))}
      {content.videos.length > 0 &&
        content.videos.map((url) => (
          <Video
            key={url}
            ref={video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            source={{ uri: url }}
            style={[{ width }, $messageVideo]}
          />
        ))}
      {width && content.links.length > 0 && <LinkPreview width={width} url={content.links[0]} />}
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
  height: 300,
}
