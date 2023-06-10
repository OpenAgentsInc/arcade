import React, { useEffect, useState } from "react"
import { AutoImage } from "app/components"
import { StyleSheet, Pressable, View, Text } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { NostrPool } from "app/arclib/src"
import { observer } from "mobx-react-lite"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { shortenKey } from "app/utils/shortenKey"

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
    <Pressable
      onPress={() => navigate("DirectMessage", { id: dm.pubkey })}
      style={styles.$messageItem}
    >
      <AutoImage
        source={{ uri: profile?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
        style={styles.$messageAvatar}
      />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName}>{profile?.name || "No name"}</Text>
          <Text style={styles.$messageContentTime}>{createdAt}</Text>
        </View>
        <View style={styles.$messageContentRight}>
          <View style={styles.$unreadMessagesBadge}>
            <Text style={styles.$unreadMessagesText}>{1}</Text>
          </View>
        </View>
        <Text style={styles.$messageUsername} numberOfLines={1}>
          {shortenKey(dm.pubkey)}
        </Text>
        <Text style={styles.$messageContentAbout} numberOfLines={1}>
          {dm.content}
        </Text>
        <View style={styles.$divider} />
      </View>
    </Pressable>
  )

  /*
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
  */
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
  $messageUsername: {
    color: colors.messageUsername,
    marginTop: 2,
  },
  $unreadMessagesBadge: {
    alignItems: "center",
    backgroundColor: colors.unreadMessagesBadge,
    borderRadius: 100,
    justifyContent: "center",
    minWidth: 20,
    padding: 3,
  },
  $unreadMessagesText: {
    color: colors.unreadMessagesText,
    fontSize: 12,
  },
})
