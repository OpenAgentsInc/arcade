import React, { memo, useContext, useEffect } from "react"
import { AutoImage, RelayContext, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { shortenKey } from "app/utils/shortenKey"
import { useNavigation } from "@react-navigation/native"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { VenetianMaskIcon } from "lucide-react-native"
import { useStores } from "app/models"

interface UserProp {
  pubkey: string
  reverse?: boolean
  blinded?: boolean
}

export const User = memo(function User({ pubkey, reverse, blinded }: UserProp) {
  const queryClient = useQueryClient()
  const navigation = useNavigation<any>()

  const { pool, social } = useContext(RelayContext)
  const { userStore } = useStores()

  const [reputation, setReputation] = React.useState(null)

  const { data: profile } = useQuery({
    queryKey: ["user", pubkey],
    queryFn: async () => {
      const list = await pool.list([{ kinds: [0], authors: [pubkey] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        return JSON.parse(latest.content)
      }
      return null
    },
    initialData: () => queryClient.getQueryData(["user", pubkey]),
  })

  const redirect = () => {
    if (userStore.pubkey === pubkey) {
      navigation.navigate("Profile")
    } else {
      navigation.navigate("User", { id: pubkey })
    }
  }

  useEffect(() => {
    const getReputation = async () => {
      const rep = await social.getReputation(pubkey)
      setReputation(rep)
    }
    getReputation()
  }, [])

  return (
    <>
      <Pressable onPress={() => redirect()} style={$user}>
        <AutoImage
          source={{ uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg" }}
          style={$userAvatar}
        />
        {blinded && (
          <View style={$blinded}>
            <VenetianMaskIcon width={20} height={20} color={colors.palette.cyan500} />
          </View>
        )}
      </Pressable>
      <View style={reverse ? $userTitleReverse : $userTitle}>
        <Text
          preset="bold"
          size="xs"
          style={$userName}
          numberOfLines={1} >
          {profile?.username || profile?.display_name || shortenKey(pubkey)} { reputation === null ? <Text size="xxs">(loading)</Text> : isNaN(reputation) ? <Text size="xxs">(no reputation)</Text> : <Text size="xs">{(reputation * 100).toFixed(2)}%</Text> }
        </Text>
      </View>
    </>
  )
})

const $user: ViewStyle = {
  flexShrink: 0,
  position: "relative",
}

const $blinded: ViewStyle = {
  alignSelf: "center",
  marginTop: spacing.tiny,
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
