import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import Logo from "../components/icon.svg"

export const HudNavigator = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.bottomBar}></View>
      <View style={{ marginTop: 140, marginLeft: 40, flex: 1 }}>
        <Logo style={{ color: "#fff" }} height={40} width={40} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    width: "90%",
    height: 60,
    backgroundColor: "#222",
    left: "5%",
    bottom: 70,
    borderRadius: 15,
  },
})
