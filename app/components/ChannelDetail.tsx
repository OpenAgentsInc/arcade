import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { spacing } from "app/theme"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

type ChannelDetailProps = {
  image: any
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
      <Image source={image} style={styles.$messageAvatar} />
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
  $divider: {
    borderBottomColor: "#232324",
    borderBottomWidth: 1,
    // marginTop: spacing.small,
    marginVertical: 8,
  },
  $messageAvatar: {
    borderColor: "#232324",
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
    color: "#7B7C7F",
    lineHeight: 0,
    marginTop: 1,
    maxWidth: 250,
  },
  $messageContentHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  $messageContentName: {
    color: "white",
    fontWeight: "bold",
    lineHeight: 0,
  },
  $messageContentRight: {
    position: "absolute",
    right: 0,
    top: 25,
  },
  $messageContentTime: {
    color: "#7B7C7F",
  },
  $messageItem: {
    flex: 1,
    flexDirection: "row",
  },
  $messageUsername: {
    color: "white",
    marginTop: 2,
  },
  $unreadMessagesBadge: {
    alignItems: "center",
    backgroundColor: "#666",
    borderRadius: 100,
    justifyContent: "center",
    minWidth: 20,
    padding: 3,
  },
  $unreadMessagesText: {
    color: "#000",
    fontSize: 12,
  },
})
