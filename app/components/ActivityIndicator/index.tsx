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

type ActivityIndicatorProps = {
  type?: "small" | "large"
  color?: string
  strokeWidth?: number
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  type = "small",
  color = colors.palette.cyan400,
  strokeWidth = 10,
}) => {
  const canvasSize = 240
  const internalOffset = 30
  const internalRadius = (canvasSize / 2 - internalOffset) / 2

  const externalLoop = useSpring(
    { yoyo: false, loop: true },
    {
      mass: 1.5,
      velocity: 100,
      damping: 15,
    },
  )

  const internalLoop = useTiming(
    { yoyo: false, loop: true },
    {
      duration: 500,
      easing: Easing.linear,
    },
  )

  const externalProgress = useComputedValue(() => {
    return externalLoop.current
  }, [externalLoop])

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
