import React, { useContext, useEffect, useState } from "react"
import { AutoImage, RelayContext, Text } from "app/components"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"

export function ContactItem({ pubkey }: { pubkey: string }) {
  const pool: any = useContext(RelayContext)
  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      const list = await pool.list([{ kinds: [0], authors: [pubkey] }], true)
      if (list.length > 0) {
        const content = JSON.parse(list[0].content)
        setMetadata(content)
      } else {
        console.log("channel metadata not found", pubkey)
      }
    }

    fetchProfile().catch(console.error)
  }, [pubkey])

  return (
    <View style={$item}>
      <AutoImage
        source={{ uri: metadata?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
        style={$itemAvatar}
      />
      <View>
        <Text
          text={metadata?.display_name || metadata?.name || "Loading..."}
          preset="bold"
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
}

const $itemName: TextStyle = {
  lineHeight: 0,
}

const $itemContent: TextStyle = {
  width: 240,
  lineHeight: 0,
  color: "rgba(255,255,255,0.5)",
}
