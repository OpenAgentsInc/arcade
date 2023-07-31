import React, { useContext } from "react"
import { RelayContext } from "app/components"
import { StyleSheet, Pressable, View, Text, Image } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { BlindedEvent } from "app/arclib/src"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { useQuery } from "@tanstack/react-query"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

const colors = {
  borderBottomColor: "#232324",
  borderColor: "#232324",
  messageContentAbout: "#7B7C7F",
  messageContentName: "white",
  messageContentTime: "#7B7C7F",
  messageUsername: "white",
  unreadMessagesBadge: "#666",
  unreadMessagesText: "#000",
}

export const DirectMessageItem = observer(function DirectMessageItem({ dm }: { dm: BlindedEvent }) {
  const navigation = useNavigation<any>()
  const createdAt = formatCreatedAt(dm.created_at)

  const { pool } = useContext(RelayContext)
  const {
    userStore: { pubkey, findContact },
  } = useStores()

  const legacy = findContact(dm.pubkey)?.legacy ?? true

  const { data: profile } = useQuery(["user", dm.pubkey], async () => {
    const list = await pool.list([{ kinds: [0], authors: [dm.pubkey] }], true)
    const latest = list.slice(-1)[0]
    if (latest) {
      return JSON.parse(latest.content)
    }
    return null
  })

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("DirectMessage", {
          id: dm.pubkey,
          name: profile?.username || profile?.name || profile?.display_name,
          legacy,
        })
      }
      style={styles.$messageItem}
    >
      <Image
        source={{ uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg" }}
        style={styles.$messageAvatar}
      />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName} numberOfLines={1}>
            {(profile?.username || profile?.name || profile?.display_name || "No name") +
              (pubkey === dm.pubkey ? " (you)" : "")}
          </Text>
          <Text style={styles.$messageContentTime}>{createdAt}</Text>
        </View>
        <View style={styles.$messageContentRight}></View>
        <Text style={styles.$messageContentAbout} numberOfLines={1}>
          {dm.content}
        </Text>
        <View style={styles.$divider} />
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  $divider: {
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  $messageAvatar: {
    borderColor: colors.borderColor,
    borderRadius: 100,
    borderWidth: 0.6,
    height: 50,
    marginRight: spacing.small,
    marginTop: 2,
    width: 50,
  },
  $messageContent: {
    flex: 1,
  },
  $messageContentAbout: {
    color: colors.messageContentAbout,
    height: 30,
    marginTop: 1,
    maxWidth: 250,
  },
  $messageContentHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  $messageContentName: {
    color: colors.messageContentName,
    fontWeight: "bold",
  },
  $messageContentRight: {
    position: "absolute",
    right: 0,
    top: 25,
  },
  $messageContentTime: {
    color: colors.messageContentTime,
  },
  $messageItem: {
    flex: 1,
    flexDirection: "row",
  },
})
