import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import Logo from "../components/icon.svg"

export const HudNavigator = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.bottomBar}>
        <Logo style={styles.logo} height={35} width={35} />
        <Logo style={styles.logo} height={35} width={35} />
        <Logo style={styles.logo} height={35} width={35} />
      </View>
    </View>
  )
}

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
