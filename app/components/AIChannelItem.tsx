import React from "react"
import { AutoImage } from "app/components"
import { StyleSheet, Pressable, View, Text } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { Channel } from "app/models"
import { observer } from "mobx-react-lite"
import { formatCreatedAt } from "app/utils/formatCreatedAt"

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

export const AIChannelItem = observer(function ChannelItem({ channel }: { channel: Channel }) {
  const { navigate } = useNavigation<any>()
  const createdAt = formatCreatedAt(channel.lastMessageAt)

  return (
    <Pressable onPress={() => navigate("AIChat")} style={styles.$messageItem}>
      <AutoImage
        source={{ uri: channel.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
        style={styles.$messageAvatar}
      />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName}>{channel.name || "No name"}</Text>
          <Text style={styles.$messageContentTime}>{createdAt}</Text>
        </View>
        {/* <Text style={styles.$messageUsername} numberOfLines={1}>
          {channel.lastMessagePubkey ? shortenKey(channel.lastMessagePubkey) : channel.id}
        </Text> */}
        <Text style={styles.$messageContentAbout} numberOfLines={1}>
          {channel.lastMessage || channel.about || "No about"}
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
    marginBottom: 6,
    marginTop: 8,
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
    paddingTop: 2,
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
