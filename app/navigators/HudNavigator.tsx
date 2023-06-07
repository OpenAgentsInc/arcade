import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import Logo from "../components/icon.svg"

export const HudNavigator = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ marginTop: 140, marginLeft: 40, flex: 1 }}>
        <Logo style={{ color: "#fff" }} height={40} width={40} />
      </View>
    </View>
  )
}
