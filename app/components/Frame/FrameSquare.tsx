import { BlurMask, Rect } from "@shopify/react-native-skia"
import React, { useMemo } from "react"

/**
 * The type of the corners of the inner square.
 */
type CornerType = "bottomLeft" | "bottomRight" | "topLeft" | "topRight"

/**
 * Props for the FrameSquare component.
 */
type FrameSquareProps = {
  /**
   * The size of the square.
   */
  size: number
  /**
   * The color of the square.
   */
  color: string
  /**
   * The stroke width of the square.
   */
  strokeWidth: number
  /**
   * The x-coordinate of the square.
   */
  x: number
  /**
   * The y-coordinate of the square.
   */
  y: number
  /**
   * The type of the inner square corner.
   */
  innerSquareType: CornerType
}

/**
 * FrameSquare component renders a square frame with an inner square.
 */
const FrameSquare: React.FC<FrameSquareProps> = ({
  x,
  y,
  size,
  color,
  strokeWidth,
  innerSquareType,
}) => {
  /**
   * Calculate the x-coordinate of the inner square based on the corner type.
   */
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

  /**
   * Calculate the y-coordinate of the inner square based on the corner type.
   */
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
      {/* Render the outer square */}
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        color={color}
        style={"stroke"}
        strokeWidth={strokeWidth}
      />
      {/* Render the inner square with blur effect */}
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
      {/* Render the inner square */}
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
