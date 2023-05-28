import React from "react"
import { StyleSheet, Dimensions } from "react-native"
import { Canvas, Circle, RadialGradient, vec } from "@shopify/react-native-skia"

const { width, height } = Dimensions.get("window")

export const Spotlight = () => {
  const r = width / 2
  const c = vec(r, height / 3.2)

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Circle cx={c.x} cy={c.y} r={r}>
        <RadialGradient c={c} r={r} colors={["rgba(0, 42, 59, 0.5)", "rgba(0, 0, 0, 1)"]} />
      </Circle>
    </Canvas>
  )
}
