import { Image, View } from "react-native"

export const SplashScreen = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}
    >
      <Image source={require("./bootsplash_logo.png")} resizeMode="contain" />
    </View>
  )
}
