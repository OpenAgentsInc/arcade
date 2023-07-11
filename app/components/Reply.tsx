import { useQuery } from "@tanstack/react-query"
import { NostrPool } from "app/arclib/src"
import React, { useContext } from "react"
import { View, ViewStyle } from "react-native"
import { RelayContext, ReplyUser, Text } from "app/components"
import { colors, spacing } from "app/theme"

export function Reply({ id }: { id: string }) {
  const pool = useContext(RelayContext) as NostrPool

  const { data: event } = useQuery(["event", id], async () => {
    const events = await pool.list([{ ids: [id] }], true)
    if (events[0]) {
      events[0].content = await pool.ident.nip04Decrypt(events[0].pubkey, events[0].content)
      return events[0]
    } else {
      return events[0]
    }
  })

  return (
    <View style={$replyItem}>
      <ReplyUser pubkey={event?.pubkey} />
      <Text text={event?.content || "Can't fetch event"} numberOfLines={1} />
    </View>
  )
}

const $replyItem: ViewStyle = {
  borderLeftWidth: 3,
  borderLeftColor: colors.palette.cyan500,
  borderRadius: 1,
  paddingHorizontal: spacing.extraSmall,
  paddingVertical: spacing.tiny,
  marginLeft: spacing.small,
}
