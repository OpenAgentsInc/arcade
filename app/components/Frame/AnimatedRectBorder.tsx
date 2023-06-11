import { Group, Line, SkiaValue, vec } from "@shopify/react-native-skia"
import React, { useCallback } from "react"
import { Scaler } from "./Scaler"

type AnimatedRectBorderProps = {
  x: number
  y: number
  strokeWidth: number
  height: number
  width: number
  color?: string
  scale: SkiaValue<number>
}

const AnimatedRectBorder = ({
  x,
  y,
  strokeWidth,
  height,
  width,
  color,
  scale,
}: AnimatedRectBorderProps) => {
  const getScaleOrigin = useCallback(
    (lineType: "top" | "right" | "bottom" | "left") => {
      const centerX = (width + x) / 2
      const centerY = (height + y) / 2

      switch (lineType) {
        case "top":
          return { x: centerX, y }
        case "right":
          return { x: x + width, y: centerY }
        case "bottom":
          return { x: centerX, y: y + height }
        case "left":
          return { x, y: centerY }
      }
    },
    [height, width, x, y],
  )

  return (
    <Group>
      <Scaler type="scaleX" scale={scale} scaleOrigin={getScaleOrigin("top")}>
        <Line p1={vec(x, y)} p2={vec(x + width, y)} color={color} strokeWidth={strokeWidth} />
      </Scaler>
      <Scaler type="scaleY" scale={scale} scaleOrigin={getScaleOrigin("left")}>
        <Line p1={vec(x, y)} p2={vec(x, y + height)} color={color} strokeWidth={strokeWidth} />
      </Scaler>
      <Scaler type="scaleY" scale={scale} scaleOrigin={getScaleOrigin("right")}>
        <Line
          p1={vec(x + width, y)}
          p2={vec(x + width, y + height)}
          color={color}
          strokeWidth={strokeWidth}
        />
      </Scaler>
      <Scaler type="scaleX" scale={scale} scaleOrigin={getScaleOrigin("bottom")}>
        <Line
          p1={vec(x, y + height)}
          p2={vec(x + width, y + height)}
          color={color}
          strokeWidth={strokeWidth}
        />
      </Scaler>
    </Group>
  )
}

export { AnimatedRectBorder }
