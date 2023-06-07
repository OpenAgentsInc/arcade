import { StatusBar } from "expo-status-bar"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import Chat from "../components/icons/chat.svg"
import Profile from "../components/icons/profile.svg"
import Settings from "../components/icons/settings.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChannelItem } from "app/components"

export const HudNavigator = () => {
  const { bottom } = useSafeAreaInsets()
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView style={styles.list}>
        {/* create 15 ChannelDetail components */}
        {Array.from(Array(3).keys()).map((i) => (
          // <ChannelDetail key={i} />
          <ChannelItem />
        ))}
      </ScrollView>
      <View style={[styles.bottomBar, { bottom: bottom + 10 }]}>
        <Profile style={styles.logo} height={logoSize} width={logoSize} />
        <Chat style={styles.logoActive} height={logoSize} width={logoSize} />
        <Settings style={styles.logo} height={logoSize} width={logoSize} />
      </View>
    </View>
  )
}

const ChannelDetail = () => {
  return (
    <View style={styles.channelCard}>
      <Image
        source={{ uri: "https://placekitten.com/200/200" }}
        style={{ width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }}
      />
      <Text style={styles.channelText}>Hello, this is a demo channel thing</Text>
    </View>
  )
}

const logoSize = 30
const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    width: "90%",
    height: 60,
    backgroundColor: "rgba(0,24,24,0.65)",
    borderWidth: 1,
    borderColor: "rgba(0,48,48,0.85)",
    left: "5%",
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  channelCard: {
    width: "100%",
    height: 60,
    backgroundColor: "#111",
    borderRadius: 15,
    // justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  channelText: {
    color: "#999",
    marginLeft: 20,
  },
  list: {
    flex: 1,
    padding: 10,
    marginTop: 40,
  },
  logo: { color: "#155e75" },
  logoActive: { color: "cyan" },
})
