import React, { useEffect, useState } from "react"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { getLinkPreview } from "link-preview-js"
import AutoHeightImage from "react-native-auto-height-image"
import { Text } from "app/components"
import { colors, spacing } from "app/theme"

export function LinkPreview({ url }: { url: string }) {
  const domain = new URL(url)
  const [preview, setPreview] = useState(null)
  console.log(preview)

  useEffect(() => {
    getLinkPreview(url).then((data) => setPreview(data))
  }, [url])

  return (
    <View style={$opWrapper}>
      {!preview ? (
        <Text text="Loading..." />
      ) : (
        <>
          <AutoHeightImage width={308} source={{ uri: preview.images[0] }} />
          <View style={$opContent}>
            <Text text={preview.title} preset="bold" size="sm" style={$ogTitle} />
            <Text text={preview.description} size="sm" style={$ogDesc} />
            <Text
              text={domain.hostname}
              onPress={() => Linking.openURL(preview.url)}
              style={$ogDomain}
            />
          </View>
        </>
      )}
    </View>
  )
}

const $opWrapper: ViewStyle = {
  flex: 1,
}

const $opContent: ViewStyle = {
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.small,
}

const $ogTitle: TextStyle = {
  color: colors.palette.white,
}

const $ogDesc: TextStyle = {
  marginTop: spacing.extraSmall,
  color: colors.palette.cyan600,
}

const $ogDomain: TextStyle = {
  marginTop: spacing.small,
  color: colors.palette.cyan700,
}
