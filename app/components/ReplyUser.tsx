import { useQuery } from "@tanstack/react-query"
import React, { useContext } from "react"
import { TextStyle, View } from "react-native"
import { RelayContext, Text } from "app/components"
import { colors } from "app/theme"

export function ReplyUser({ pubkey }: { pubkey: string }) {
  const { pool } = useContext(RelayContext)

  const { data: profile } = useQuery(["user", pubkey], async () => {
    const list = await pool.list([{ kinds: [0], authors: [pubkey] }], true)
    const latest = list.slice(-1)[0]
    if (latest) {
      return JSON.parse(latest.content)
    }
  })

  return (
    <View>
      <Text
        text={profile?.username || profile?.name || profile?.display_name || "No name"}
        numberOfLines={1}
        style={$replyUser}
        size="sm"
      />
    </View>
  )
}

const $replyUser: TextStyle = {
  color: colors.palette.cyan500,
}
