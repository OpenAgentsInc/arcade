import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { spacing } from "app/theme"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

type ChannelDetailProps = {
  image: string
  name: string
  lastMessage: string
  lastMessageUsername: string
  lastMessageTime: number
  unreadCount: number
}

export const ChannelDetail = (props: ChannelDetailProps) => {
  const { image, name, lastMessage, lastMessageUsername, lastMessageTime, unreadCount } = props
  return (
    <Pressable style={styles.$messageItem} onPress={() => {}}>
      <Image source={{ uri: image }} style={styles.$messageAvatar} />
      <View style={styles.$messageContent}>
        <View style={styles.$messageContentHeading}>
          <Text style={styles.$messageContentName}>{name}</Text>
          <Text style={styles.$messageContentTime}>
            {dayjs.unix(lastMessageTime).format("h:mm A")}
          </Text>
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
  $messageItem: {
    flex: 1,
    flexDirection: "row",
  },
  $messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 2,
    marginRight: spacing.small,
  },
  $messageContent: {
    flex: 1,
  },
  $messageContentHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  $messageContentTime: {
    color: "#7B7C7F",
  },
  $messageContentName: {
    lineHeight: 0,
    color: "white",
    fontWeight: "bold",
  },
  $messageUsername: {
    marginTop: 2,
    color: "white",
  },
  $messageContentAbout: {
    maxWidth: 250,
    lineHeight: 0,
    marginTop: 1,
    color: "#7B7C7F",
  },
  $unreadMessagesBadge: {
    backgroundColor: "#666",
    borderRadius: 100,
    padding: 3,
    minWidth: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  $unreadMessagesText: {
    color: "#000",
    fontSize: 12,
  },
  $messageContentRight: {
    position: "absolute",
    top: 25,
    right: 0,
  },
  $divider: {
    borderBottomColor: "#232324",
    borderBottomWidth: 1,
    // marginTop: spacing.small,
    marginVertical: 8,
  },
})
