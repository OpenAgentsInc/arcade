import { BlurMask, Rect } from "@shopify/react-native-skia"
import React, { useMemo } from "react"

type CornerType = "bottomLeft" | "bottomRight" | "topLeft" | "topRight"

type FrameSquareProps = {
  size: number
  color: string
  strokeWidth: number
  x: number
  y: number
  innerSquareType: CornerType
}

const FrameSquare: React.FC<FrameSquareProps> = ({
  x,
  y,
  size,
  color,
  strokeWidth,
  innerSquareType,
}) => {
  const innerX = useMemo(() => {
    switch (innerSquareType) {
      case "bottomLeft":
        return x + strokeWidth / 2
      case "bottomRight":
        return x - strokeWidth / 2
      case "topLeft":
        return x - strokeWidth / 2
      case "topRight":
        return x + strokeWidth / 2
    }
  }, [innerSquareType, x, strokeWidth])

  const innerY = useMemo(() => {
    switch (innerSquareType) {
      case "bottomLeft":
        return y + strokeWidth / 2
      case "bottomRight":
        return y + strokeWidth / 2
      case "topLeft":
        return y - strokeWidth / 2
      case "topRight":
        return y - strokeWidth / 2
    }
  }, [innerSquareType, y, strokeWidth])

  return (
    <>
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        color={color}
        style={"stroke"}
        strokeWidth={strokeWidth}
      />
      <Rect
        x={innerX}
        y={innerY}
        width={size}
        height={size}
        color={color}
        strokeWidth={strokeWidth}
      >
        <BlurMask style={"solid"} blur={6} />
      </Rect>
      <Rect
        x={innerX}
        y={innerY}
        width={size}
        height={size}
        color={"black"}
        strokeWidth={strokeWidth}
      />
    </>
  )
}

export { FrameSquare }
export type { CornerType }
