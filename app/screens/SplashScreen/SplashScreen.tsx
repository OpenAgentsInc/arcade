import { Image, StyleSheet, View } from "react-native"

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./bootsplash_logo.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
})
