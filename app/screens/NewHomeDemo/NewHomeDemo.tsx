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
        {Array.from(Array(3).keys()).map((i) => (
          <Animated.View key={i} entering={FadeInDown.delay(100 * i).duration(800)}>
            <ChannelDetail />
          </Animated.View>
        ))}
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
