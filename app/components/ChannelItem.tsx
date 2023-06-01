import React, { useContext, useEffect, useState } from "react"
import { AutoImage, RelayContext, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"

export function ChannelItem({ id, privkey }: { id: string; privkey?: string }) {
  const pool: any = useContext(RelayContext)
  const { navigate } = useNavigation<any>()

  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      const list = await pool.list([{ kinds: [40], ids: [id] }], true)
      if (list.length > 0) {
        const content = JSON.parse(list[0].content)
        setMetadata(content)
      } else {
        console.log("channel metadata not found", id)
      }
    }

    fetchProfile().catch(console.error)
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
  width: 240,
  lineHeight: 0,
  color: "rgba(255,255,255,0.5)",
}
