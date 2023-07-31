import React, { useContext, useEffect } from "react"
import { StyleSheet, Pressable, View, Text } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { Channel, useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { useQuery } from "@tanstack/react-query"
import { RelayContext } from "./RelayProvider"
import FastImage from "react-native-fast-image"

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

export const ChannelItem = observer(function ChannelItem({ channel }: { channel: Channel }) {
  const { pool, channelManager } = useContext(RelayContext)
  const { navigate } = useNavigation<any>()
  const {
    userStore: { pubkey, metadata },
  } = useStores()

  const createdAt = formatCreatedAt(channel.lastMessageAt)

  const { data: profile } = useQuery(["user", channel.lastMessagePubkey], async () => {
    if (pubkey === channel.lastMessagePubkey) return metadata
    const list = await pool.list([{ kinds: [0], authors: [channel.lastMessagePubkey] }], true)
    const latest = list.slice(-1)[0]
    if (latest) {
      return JSON.parse(latest.content)
    }
    return null
  })

  useEffect(() => {
    // only fetch meta if channel name not present
    if (!channel.name) {
      try {
        channel.fetchMeta(channelManager)
      } catch (e) {
        console.log("failed to fetch channel meta:", channel)
      }
    }
  }, [channel.name])

  return (
    <Pressable onPress={() => navigate("Chat", { id: channel.id })} style={styles.$messageItem}>
      <FastImage
        source={{ uri: channel.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg" }}
        style={styles.$messageAvatar}
      />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName} numberOfLines={1}>
            {channel.name || "No name"}
          </Text>
          <Text style={styles.$messageContentTime}>{createdAt}</Text>
        </View>
        <View style={styles.$messageContentRight}>
          {/*
          <View style={styles.$unreadMessagesBadge}>
            <Text style={styles.$unreadMessagesText}>{1}</Text>
          </View>
          */}
        </View>
        <Text style={styles.$messageUsername} numberOfLines={1}>
          {channel.lastMessagePubkey
            ? profile?.username || profile?.name || profile?.display_name || "No name"
            : channel.id}
        </Text>
        <Text style={styles.$messageContentAbout} numberOfLines={1}>
          {channel.lastMessage || channel.about || ""}
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
    maxWidth: 250,
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
