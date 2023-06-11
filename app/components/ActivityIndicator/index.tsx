import {
  Canvas,
  Easing,
  Group,
  useComputedValue,
  useSpring,
  useTiming,
} from "@shopify/react-native-skia"
import React from "react"
import { AnimatedArc } from "./AnimatedArc"
import { StyleSheet } from "react-native"
import { colors } from "app/theme"

/**
 * Props for the ActivityIndicator component.
 */
type ActivityIndicatorProps = {
  /**
   * The type of the activity indicator. Can be "small" or "large" (optional).
   */
  type?: "small" | "large"
  /**
   * The color of the activity indicator (optional).
   */
  color?: string
  /**
   * The stroke width of the activity indicator (optional).
   */
  strokeWidth?: number
}

/**
 * ActivityIndicator component renders a spinning activity indicator.
 */
const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  type = "small",
  color = colors.tint,
  strokeWidth = 10,
}) => {
  // Define the canvas size and internal offset
  const canvasSize = 240
  const internalOffset = 30

  // Calculate the radius of the internal circle
  const internalRadius = (canvasSize / 2 - internalOffset) / 2

  // Set up the external loop animation using useSpring hook
  const externalLoop = useSpring(
    { yoyo: false, loop: true },
    {
      mass: 1.5,
      velocity: 100,
      damping: 15,
    },
  )

  // Set up the internal loop animation using useTiming hook
  const internalLoop = useTiming(
    { yoyo: false, loop: true },
    {
      duration: 500,
      easing: Easing.linear,
    },
  )

  // Compute the external progress value
  const externalProgress = useComputedValue(() => {
    return externalLoop.current
  }, [externalLoop])

  // Calculate the center coordinates of the canvas
  const cx = canvasSize / 2
  const cy = canvasSize / 2

  return (
    <Canvas
      style={[
        {
          height: canvasSize,
        },
        styles.container,
      ]}
    >
      {type === "large" && (
        <Group
          origin={{
            x: cx,
            y: cy,
          }}
        >
          {/* Render the large animated arc */}
          <AnimatedArc
            cx={cx}
            cy={cy}
            orientation={"counter-clockwise"}
            progress={externalProgress}
            internalRadius={internalRadius * 1.8}
            color={color}
            strokeWidth={strokeWidth}
            showOpacityAnimation
          />
        </Group>
      )}
      {/* Render the small animated arc */}
      <AnimatedArc
        cx={cx}
        cy={cy}
        progress={internalLoop}
        internalRadius={internalRadius}
        color={color}
        strokeWidth={strokeWidth}
      />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  container: { aspectRatio: 1 },
})

export { ActivityIndicator }
