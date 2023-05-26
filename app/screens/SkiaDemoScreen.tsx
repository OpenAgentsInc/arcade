import { StyleSheet, Text, View } from "react-native"

export const SkiaDemoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Skia Demo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
})
