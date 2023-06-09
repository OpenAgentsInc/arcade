import { Image, StyleSheet, Text, View } from "react-native"

type ChannelDetailProps = {
  name: string
  description: string
  lastMessage: string
  lastMessageUsername: string
  lastMessageTime: string
}

export const ChannelDetail = (props: ChannelDetailProps) => {
  const { name, description, lastMessage, lastMessageUsername, lastMessageTime } = props
  return (
    <View style={styles.channelCard}>
      <Image source={{ uri: "https://placekitten.com/200/200" }} style={styles.channelImage} />
      <View style={styles.channelInfo}>
        <Text style={styles.channelTitle}>{name}</Text>
        <Text style={styles.channelDescription}>{description}</Text>
        <Text style={styles.channelLastMessage}>
          {lastMessageUsername + " - " + lastMessage + " "}
          <Text style={styles.channelLastMessageTime}>{lastMessageTime}</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  channelCard: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    backgroundColor: "#111",
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  channelDescription: {
    color: "#666",
    marginTop: 5,
  },
  channelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  channelInfo: {
    flex: 1,
  },
  channelTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  channelLastMessage: {
    color: "#999",
  },
  channelLastMessageTime: {
    color: "#555",
  },
})
