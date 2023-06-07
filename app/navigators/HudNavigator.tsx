import { StatusBar } from "expo-status-bar"
import { View } from "react-native"

export const HudNavigator = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
    </View>
  )
}
