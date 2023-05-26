import { StyleSheet, Text, View } from "react-native"
import { Canvas, Circle, Group } from "@shopify/react-native-skia"
import { StatusBar } from "expo-status-bar"

export const SkiaDemoScreen = () => {
  const size = 256
  const r = size * 0.33
  return (
    <>
      <StatusBar style="light" />
      <Canvas style={{ flex: 1, backgroundColor: "black" }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={size - r} cy={r} r={r} color="magenta" />
          <Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
        </Group>
      </Canvas>
    </>
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
