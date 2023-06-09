import { Image, StyleSheet, Text, View } from "react-native"

export const ChannelDetail = () => {
  return (
    <View style={styles.channelCard}>
      <Image source={{ uri: "https://placekitten.com/200/200" }} style={styles.channelImage} />
      <View style={styles.channelInfo}>
        <Text style={styles.channelTitle}>Channel Name</Text>
        <Text style={styles.channelLastMessage}>
          {"Last message from @username "}
          <Text style={styles.channelLastMessageTime}>10m</Text>
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
