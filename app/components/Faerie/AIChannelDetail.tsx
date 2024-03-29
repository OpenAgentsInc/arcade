import React from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { images, spacing } from "app/theme"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useNavigation } from "@react-navigation/native"
import { formatCreatedAt } from "app/utils/formatCreatedAt"

dayjs.extend(relativeTime)

// type ChannelDetailProps = {
//   image: string
//   name: string
//   lastMessage: string
//   lastMessageUsername: string
//   lastMessageTime: number
//   unreadCount: number
// }

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

export const AIChannelDetail = (props: any) => {
  // console.log("PROPS:", props)
  const { navigate } = useNavigation<any>()
  const { channel } = props
  const image = images.faerie
  const name = "AI Chat"
  const lastMessage = channel.latest_message.message
  const lastMessageTime = channel.lastMessageAt
  return (
    <Pressable
      style={styles.$messageItem}
      onPress={() => navigate("AIChannel", { id: channel.id })}
    >
      <Image source={image} style={styles.$messageAvatar} />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName}>{name}</Text>
          <Text style={styles.$messageContentTime}>{formatCreatedAt(lastMessageTime)}</Text>
        </View>
        <View style={styles.$messageContentRight}>
          {/* <View style={styles.$unreadMessagesBadge}>
            <Text style={styles.$unreadMessagesText}>{unreadCount}</Text>
          </View> */}
        </View>
        <Text style={styles.$messageContentAbout} numberOfLines={1}>
          {lastMessage}
        </Text>
        <Text style={styles.$messageContentAbout} numberOfLines={1}></Text>
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
    marginTop: 3,
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
