import React, { useContext, useEffect, useState } from "react"
import { AutoImage, RelayContext, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function User({ pubkey, createdAt }: { pubkey: string; createdAt?: number }) {
  const pool: any = useContext(RelayContext)
  const [profile, setProfile] = useState(null)
  const navigation = useNavigation<any>()

  useEffect(() => {
    async function fetchProfile() {
      const list = await pool.list([{ kinds: [0], authors: [pubkey] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        const content = JSON.parse(latest.content)
        setProfile(content)
      } else {
        console.log("user profile not found", pubkey)
      }
    }

    fetchProfile().catch(console.error)
  }, [pubkey])

  return (
    <Pressable onPress={() => navigation.navigate("User", { id: pubkey })} style={$user}>
      <AutoImage
        source={{ uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg" }}
        style={$userAvatar}
      />
      <View style={$userTitle}>
        <Text
          text={profile?.display_name || shortenKey(pubkey)}
          preset="bold"
          size="xs"
          style={$userName}
        />
        <Text
          text={"· " + dayjs().to(dayjs.unix(createdAt), true)}
          preset="default"
          size="xs"
          style={$createdAt}
        />
      </View>
    </Pressable>
  )
}

const $user: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.extraSmall,
  zIndex: 10,
}

const $userAvatar: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 100,
  flexShrink: 0,
}

const $userTitle: ViewStyle = {
  flexDirection: "row",
  gap: spacing.tiny,
}

const $userName: TextStyle = {
  color: colors.palette.cyan500,
}

const $createdAt: TextStyle = {
  color: colors.palette.cyan800,
}
