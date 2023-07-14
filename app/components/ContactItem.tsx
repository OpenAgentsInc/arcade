import React, { useContext } from "react"
import { RelayContext, Text } from "app/components"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"
import { useQuery } from "@tanstack/react-query"

export function ContactItem({ pubkey, fallback }: { pubkey: string; fallback?: string }) {
  const { pool } = useContext(RelayContext)
  const { data: profile } = useQuery(["user", pubkey], async () => {
    if (fallback) {
      return JSON.parse(fallback)
    } else {
      const list = await pool.list([{ kinds: [0], authors: [pubkey] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        return JSON.parse(latest.content)
      }
    }
  })

  return (
    <View style={$item}>
      <Image
        source={{
          uri: profile?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
        }}
        style={$itemAvatar}
      />
      <View>
        <Text
          text={profile?.display_name || profile?.username || profile?.name || "No name"}
          preset="bold"
          numberOfLines={1}
          style={$itemName}
        />
        <Text text={shortenKey(pubkey)} size="xs" numberOfLines={1} style={$itemContent} />
      </View>
    </View>
  )
}

const $item: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $itemAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
  marginRight: spacing.small,
  backgroundColor: colors.palette.overlay20,
}

const $itemName: TextStyle = {
  maxWidth: 200,
}

const $itemContent: TextStyle = {
  width: 240,
  color: "rgba(255,255,255,0.5)",
}
