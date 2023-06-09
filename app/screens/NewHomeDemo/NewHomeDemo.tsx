import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, View } from "react-native"
import Chat from "app/components/icons/chat.svg"
import Profile from "app/components/icons/profile.svg"
import Settings from "app/components/icons/settings.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { FadeInDown } from "react-native-reanimated"
import { ChannelDetail } from "app/components/ChannelDetail"

export const NewHomeDemo = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView style={styles.list}>
        <Animated.View entering={FadeInDown.delay(100).duration(800)}>
          <ChannelDetail
            name="The Lobby"
            lastMessage="Hey I'm going to see how this works"
            lastMessageUsername="Jo"
            lastMessageTime={Date.now() - 180000} // 3 minutes ago
            unreadCount={4}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(800)}>
          <ChannelDetail
            name="Global Trade"
            lastMessage="WTB Bitcoin"
            lastMessageUsername="satoshi"
            lastMessageTime={Date.now() - 960000} // 16 minutes ago
            unreadCount={28}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(300).duration(800)}>
          <ChannelDetail
            name="Arcade Feedback"
            lastMessage="this is cool"
            lastMessageUsername="user123"
            lastMessageTime={Date.now() - 2880000} // 48 minutes ago
            unreadCount={112}
          />
        </Animated.View>
      </ScrollView>
      <Animated.View entering={FadeInDown.delay(500).duration(1000)}>
        <View style={[styles.bottomBar, { bottom: bottom + 10 }]}>
          <Profile style={styles.logo} height={logoSize} width={logoSize} />
          <Chat style={styles.logoActive} height={logoSize} width={logoSize} />
          <Settings style={styles.logo} height={logoSize} width={logoSize} />
        </View>
      </Animated.View>
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
  list: {
    flex: 1,
    padding: 10,
    marginTop: 40,
  },
  logo: { color: "#155e75" },
  logoActive: { color: "cyan" },
})
