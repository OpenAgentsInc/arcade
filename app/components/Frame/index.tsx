import React from "react"
import { FrameProps as SkiaFrameProps, Frame as SkiaFrame } from "./Frame"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type LayoutViewStyle = ViewStyle

type FrameProps = Omit<SkiaFrameProps, "height" | "width"> & {
  children?: React.ReactNode
  style: StyleProp<LayoutViewStyle>
}

const Frame: React.FC<FrameProps> = ({ style, children, highlighted, ...skiaFrameProps }) => {
  const { height, width } = StyleSheet.flatten(style)

  if (typeof height !== "number" || typeof width !== "number") {
    throw new Error("Frame must have a numeric height and width")
  }

  return (
    <View style={style}>
      <View style={StyleSheet.absoluteFill}>
        <SkiaFrame height={height} width={width} {...skiaFrameProps} highlighted={highlighted} />
      </View>
      {children}
    </View>
  )
}
export { Frame, FrameProps }
