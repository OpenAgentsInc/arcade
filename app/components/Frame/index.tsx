import React from "react"
import { FrameProps as SkiaFrameProps, Frame as SkiaFrame } from "./Frame"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

// Define the type for the view style used in the layout
type LayoutViewStyle = ViewStyle

// Define the props for the Frame component
type FrameProps = Omit<SkiaFrameProps, "height" | "width"> & {
  children?: React.ReactNode
  style: StyleProp<LayoutViewStyle>
}

/**
 * Frame component that wraps the SkiaFrame component and enforces a numeric height and width.
 * It renders a view with the specified style and places the SkiaFrame as an absolute fill within it.
 * Additional children can be added inside the Frame.
 */
const Frame: React.FC<FrameProps> = ({ style, children, highlighted, ...skiaFrameProps }) => {
  // Extract the height and width from the provided style
  const { height, width } = StyleSheet.flatten(style)

  // Check if the height and width are numeric values
  if (typeof height !== "number" || typeof width !== "number") {
    throw new Error("Frame must have a numeric height and width")
  }

  return (
    <View style={style}>
      {/* Render a view that fills the entire container */}
      <View style={StyleSheet.absoluteFill}>
        {/* Render the SkiaFrame component with the provided height, width, and other props */}
        <SkiaFrame height={height} width={width} {...skiaFrameProps} highlighted={highlighted} />
      </View>
      {/* Render additional children within the Frame */}
      {children}
    </View>
  )
}

export { Frame, FrameProps }
