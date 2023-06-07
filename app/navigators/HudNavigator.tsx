import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import Contacts from "../components/icons/contacts.svg"
import Chat from "../components/icons/chat.svg"
import Profile from "../components/icons/profile.svg"
import UserPlus from "../components/icons/userplus.svg"
import Settings from "../components/icons/settings.svg"

export const HudNavigator = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.bottomBar}>
        <Profile style={styles.logo} height={logoSize} width={logoSize} />
        <Chat style={styles.logoActive} height={logoSize} width={logoSize} />
        <Settings style={styles.logo} height={logoSize} width={logoSize} />
      </View>
    </View>
  )
}

const logoSize = 30
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
  logo: { color: "#666" },
  logoActive: { color: "#fff" },
})
