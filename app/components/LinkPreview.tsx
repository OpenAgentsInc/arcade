import React from "react"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { getLinkPreview } from "link-preview-js"
import AutoHeightImage from "react-native-auto-height-image"
import { Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useQuery } from "@tanstack/react-query"

export function LinkPreview({ width, url }: { width: number; url: string }) {
  const domain = new URL(url)
  const { status, data: preview } = useQuery(
    ["og", url],
    async () => {
      return await getLinkPreview(url)
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  )

  return (
    <View style={$opWrapper}>
      {status === "loading" ? (
        <Text text="Loading..." />
      ) : status === "error" ? (
        <Text text="Failed to fetch open graph..." />
      ) : (
        <>
          {preview?.images?.[0] && (
            <AutoHeightImage width={width} source={{ uri: preview?.images[0] }} />
          )}
          <View style={$opContent}>
            <Text text={preview?.title} preset="bold" size="sm" style={$ogTitle} />
            <Text text={preview?.description} size="sm" style={$ogDesc} numberOfLines={3} />
            <Text
              text={domain.hostname}
              onPress={() => Linking.openURL(preview?.url)}
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
