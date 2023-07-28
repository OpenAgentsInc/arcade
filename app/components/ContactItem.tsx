import React, { useContext } from "react"
import { RelayContext, Text } from "app/components"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"
import { useQuery } from "@tanstack/react-query"
import FastImage from "react-native-fast-image"
import { useNavigation } from "@react-navigation/native"

export function ContactItem({
  pubkey,
  fallback,
  noPress,
  dm,
}: {
  pubkey: string
  fallback?: string
  noPress?: boolean
  dm?: boolean
}) {
  const navigation = useNavigation<any>()

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

  const navigate = () => {
    if (dm) {
      navigation.navigate("DirectMessage", {
        id: pubkey,
        name: profile?.username || profile?.name || profile?.display_name,
        legacy: profile?.legacy || true,
      })
    } else {
      navigation.navigate("User", { id: pubkey })
    }
  }

  if (noPress) {
    return (
      <View style={$item}>
        <FastImage
          source={{
            uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg",
          }}
          style={$itemAvatar}
        />
        <View>
          <Text
            text={profile?.username || profile?.name || profile?.display_name || "No name"}
            preset="bold"
            numberOfLines={1}
            style={$itemName}
          />
          <Text text={shortenKey(pubkey)} size="xs" numberOfLines={1} style={$itemContent} />
        </View>
      </View>
    )
  }

  return (
    <Pressable onPress={() => navigate()}>
      <View style={$item}>
        <FastImage
          source={{
            uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg",
          }}
          style={$itemAvatar}
        />
        <View>
          <Text
            text={profile?.username || profile?.name || profile?.display_name || "No name"}
            preset="bold"
            numberOfLines={1}
            style={$itemName}
          />
          <Text text={shortenKey(pubkey)} size="xs" numberOfLines={1} style={$itemContent} />
        </View>
      </View>
    </Pressable>
  )
}

const $item: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $itemAvatar: any = {
  width: 44,
  height: 44,
  borderRadius: 44,
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
