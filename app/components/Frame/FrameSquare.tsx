import { Rect } from "@shopify/react-native-skia"
import React from "react"

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
}

/**
 * FrameSquare component renders a square frame with an inner square.
 */
const FrameSquare: React.FC<FrameSquareProps> = ({ x, y, size, color, strokeWidth }) => {
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
    </>
  )
}

export { FrameSquare }
export type { CornerType }
