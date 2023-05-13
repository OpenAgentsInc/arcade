import React, { useEffect, useState } from "react"
import { AutoImage, Text } from "app/components"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"

export function User({ pubkey }: { pubkey: string }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      let response

      try {
        response = await fetch(`https://rbr.bio/${pubkey}/metadata.json`)
      } catch (error) {
        console.log("There was an error", error)
      }

      if (response.ok) {
        const json = await response.json()
        const metadata = JSON.parse(json.content)
        setProfile(metadata)
      } else {
        console.log(`HTTP Response Code: ${response?.status}`)
      }
    }

    fetchProfile().catch(console.error)
  }, [])

  return (
    <View style={$user}>
      <AutoImage
        source={{ uri: profile?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
        style={$userAvatar}
      />
      <Text
        text={profile?.display_name || shortenKey(pubkey)}
        preset="bold"
        size="xs"
        style={$userName}
      />
    </View>
  )
}

const $user: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.extraSmall,
}

const $userAvatar: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 100,
  flexShrink: 0,
}

const $userName: TextStyle = {
  lineHeight: 0,
  color: colors.palette.cyan500,
}
