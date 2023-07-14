import { useQuery } from "@tanstack/react-query"
import React, { useContext } from "react"
import { View, ViewStyle } from "react-native"
import { RelayContext, ReplyUser, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"

export function Reply({ id }: { id: string }) {
  const { pool } = useContext(RelayContext)

  const {
    userStore: { pubkey },
  } = useStores()

  const { data: event } = useQuery(["event", id], async () => {
    const events = await pool.list([{ ids: [id] }], true)
    if (events[0]) {
      if (events[0].kind === 4) {
        const receiver = events[0].tags.find((el) => el[0] === "p")?.[1]
        events[0].content = await pool.ident.nip04Decrypt(
          events[0].pubkey === pubkey ? receiver : events[0].pubkey,
          events[0].content,
        )
      }
      return events[0]
    } else {
      return null
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
  paddingVertical: 2,
  marginLeft: spacing.small,
}
