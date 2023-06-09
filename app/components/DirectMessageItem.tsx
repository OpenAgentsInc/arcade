import React, { useEffect, useState } from "react"
import { AutoImage, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { NostrPool } from "app/arclib/src"
import { observer } from "mobx-react-lite"
import { formatCreatedAt } from "app/utils/formatCreatedAt"

export const DirectMessageItem = observer(function DirectMessageItem({
  dm,
  pool,
}: {
  dm: any
  pool: NostrPool
}) {
  const { navigate } = useNavigation<any>()
  const [profile, setProfile] = useState(null)
  const createdAt = formatCreatedAt(dm.created_at)

  useEffect(() => {
    async function fetchProfile() {
      const list = await pool.list([{ kinds: [0], authors: [dm.pubkey] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        const content = JSON.parse(latest.content)
        setProfile(content)
      } else {
        console.log("user profile not found", dm.pubkey)
      }
    }

    fetchProfile().catch(console.error)
  }, [dm.pubkey])

  return (
    <Pressable onPress={() => navigate("DirectMessage", { id: dm.pubkey })} style={$messageItem}>
      <AutoImage
        source={{ uri: profile?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
        style={$messageAvatar}
      />
      <View style={$messageContent}>
        <View style={$messageContentHeading}>
          <Text text={profile?.name || "Anon"} preset="bold" style={$messageContentName} />
          <Text text={createdAt} style={$messageContentTime} />
        </View>
        <Text text="[encrypted]" size="sm" numberOfLines={1} style={$messageContentAbout} />
      </View>
    </Pressable>
  )
})

const $messageItem: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $messageAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
  marginRight: spacing.small,
}

const $messageContent: ViewStyle = {
  flex: 1,
}

const $messageContentHeading: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $messageContentTime: TextStyle = {
  color: "rgba(255,255,255,0.5)",
}

const $messageContentName: TextStyle = {
  lineHeight: 0,
}

const $messageContentAbout: TextStyle = {
  maxWidth: 220,
  lineHeight: 0,
  color: "rgba(255,255,255,0.5)",
}
