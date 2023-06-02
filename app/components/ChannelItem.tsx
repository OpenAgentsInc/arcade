import React, { useEffect, useState } from "react"
import { AutoImage, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"

export function ChannelItem({
  channel,
  id,
  privkey,
}: {
  channel: any
  id: string
  privkey?: string
}) {
  const { navigate } = useNavigation<any>()
  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    async function fetchMetadata() {
      const result = await channel.getMeta(id, privkey, true)
      setMetadata(result)
    }
    fetchMetadata().catch(console.error)
  }, [id])

  return (
    <Pressable
      onPress={() => navigate("Chat", { id, name: metadata?.name, privkey })}
      style={$messageItem}
    >
      <AutoImage
        source={{ uri: metadata?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
        style={$messageItemAvatar}
      />
      <View>
        <Text text={metadata?.name || "No name"} preset="bold" style={$messageItemName} />
        <Text
          text={metadata?.about || "No description"}
          size="xs"
          numberOfLines={1}
          style={$messageItemContent}
        />
      </View>
    </Pressable>
  )
}

const $messageItem: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $messageItemAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
  marginRight: spacing.small,
}

const $messageItemName: TextStyle = {
  lineHeight: 0,
}

const $messageItemContent: TextStyle = {
  maxWidth: 300,
  lineHeight: 0,
  color: "rgba(255,255,255,0.5)",
}
