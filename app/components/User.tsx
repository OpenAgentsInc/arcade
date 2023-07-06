import React, { memo, useContext } from "react"
import { AutoImage, RelayContext, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"
import { useNavigation } from "@react-navigation/native"
import { NostrPool } from "app/arclib/src"
import { useQuery } from "react-query"

interface UserProp {
  pubkey: string
  reverse?: boolean
}

export const User = memo(function User({ pubkey, reverse }: UserProp) {
  const pool = useContext(RelayContext) as NostrPool
  const navigation = useNavigation<any>()

  const { data: profile } = useQuery(["user", pubkey], async () => {
    const list = await pool.list([{ kinds: [0], authors: [pubkey] }], true)
    const latest = list.slice(-1)[0]
    if (latest) {
      return JSON.parse(latest.content)
    }
  })

  return (
    <>
      <Pressable onPress={() => navigation.navigate("User", { id: pubkey })} style={$user}>
        <AutoImage
          source={{ uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg" }}
          style={$userAvatar}
        />
      </Pressable>
      <View style={reverse ? $userTitleReverse : $userTitle}>
        <Text
          text={profile?.username || profile?.display_name || shortenKey(pubkey)}
          preset="bold"
          size="xs"
          style={$userName}
          numberOfLines={1}
        />
      </View>
    </>
  )
})

const $user: ViewStyle = {
  flexShrink: 0,
}

const $userAvatar: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 100,
  flexShrink: 0,
}

const $userTitle: ViewStyle = {
  position: "absolute",
  left: 61,
  top: 8,
  alignSelf: "flex-start",
}

const $userTitleReverse: ViewStyle = {
  position: "absolute",
  right: spacing.small + 1,
  top: 8,
  alignSelf: "flex-start",
}

const $userName: TextStyle = {
  color: colors.palette.cyan400,
  maxWidth: 200,
}
