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
      switch (lineType) {
        case "top":
          return {
            x: (width + x) / 2,
            y: 0,
          }
        case "right":
          return {
            x: width + x,
            y: (height + y) / 2,
          }
        case "bottom":
          return {
            x: (width + x) / 2,
            y: height + y,
          }
        case "left":
          return {
            x,
            y: (height + y) / 2,
          }
      }
    },
    [height, width, x, y],
  )

  return (
    <Group>
      <Scaler type="scaleX" scale={scale} scaleOrigin={getScaleOrigin("top")}>
        <Line p1={vec(x, y)} p2={vec(width + x, y)} color={color} strokeWidth={strokeWidth} />
      </Scaler>
      <Scaler type="scaleY" scale={scale} scaleOrigin={getScaleOrigin("left")}>
        <Line p1={vec(x, y)} p2={vec(x, height + y)} color={color} strokeWidth={strokeWidth} />
      </Scaler>
      <Scaler type="scaleY" scale={scale} scaleOrigin={getScaleOrigin("right")}>
        <Line
          p1={vec(width + x, y)}
          p2={vec(width + x, height + y)}
          color={color}
          strokeWidth={strokeWidth}
        />
      </Scaler>
      <Scaler type="scaleX" scale={scale} scaleOrigin={getScaleOrigin("bottom")}>
        <Line
          p1={vec(x, height + y)}
          p2={vec(width + x, height + y)}
          color={color}
          strokeWidth={strokeWidth}
        />
      </Scaler>
    </Group>
  )
}

export { AnimatedRectBorder }
