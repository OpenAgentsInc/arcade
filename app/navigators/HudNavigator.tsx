import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import Chats from "../components/icons/chats.svg"

export const HudNavigator = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.bottomBar}>
        <Chats style={styles.logo} height={logoSize} width={logoSize} />
        <Chats style={styles.logo} height={logoSize} width={logoSize} />
        <Chats style={styles.logo} height={logoSize} width={logoSize} />
      </View>
    </View>
  )
}

const logoSize = 35
const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    width: "90%",
    height: 60,
    backgroundColor: "#111",
    left: "5%",
    bottom: 70,
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: { color: "#888" },
})
