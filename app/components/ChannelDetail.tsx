import React from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { spacing } from "app/theme"
import { formatCreatedAt } from "app/utils/formatCreatedAt"

type ChannelDetailProps = {
  image: string
  name: string
  lastMessage: string
  lastMessageUsername: string
  lastMessageTime: number
  unreadCount: number
}

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

export const ChannelDetail = (props: ChannelDetailProps) => {
  const { image, name, lastMessage, lastMessageUsername, lastMessageTime, unreadCount } = props
  return (
    <Pressable style={styles.$messageItem}>
      <Image source={{ uri: image }} style={styles.$messageAvatar} />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName}>{name}</Text>
          <Text style={styles.$messageContentTime}>{formatCreatedAt(lastMessageTime)}</Text>
        </View>
        <View style={styles.$messageContentRight}>
          <View style={styles.$unreadMessagesBadge}>
            <Text style={styles.$unreadMessagesText}>{unreadCount}</Text>
          </View>
        </View>
        <Text style={styles.$messageUsername} numberOfLines={1}>
          {lastMessageUsername}
        </Text>
        <Text style={styles.$messageContentAbout} numberOfLines={1}>
          {lastMessage}
        </Text>
        <View style={styles.$divider} />
      </View>
    </Pressable>
  )
}

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
