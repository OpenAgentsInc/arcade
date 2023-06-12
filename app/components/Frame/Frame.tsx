import {
  Canvas,
  Rect,
  useComputedValue,
  useValue,
  runTiming,
  SkiaValue,
  useValueEffect,
  useSharedValueEffect,
} from "@shopify/react-native-skia"

import React, { useCallback, useMemo } from "react"
import { CornerType, FrameSquare } from "./FrameSquare"
import { Scaler } from "./Scaler"
import { AnimatedRectBorder } from "./AnimatedRectBorder"
import { colors } from "app/theme"
import { useDerivedValue, withTiming } from "react-native-reanimated"

/**
 * Props for the Frame component.
 */
type FrameProps = {
  /**
   * The height of the frame.
   */
  height: number
  /**
   * The width of the frame.
   */
  width: number
  /**
   * The color of the frame.
   */
  color?: string
  /**
   * The color of the frame border.
   */
  borderColor?: string
  /**
   * The width of the internal square border.
   */
  internalSquareBorderWidth?: number
  /**
   * The width of the frame border.
   */
  strokeWidth?: number
  /**
   * Specifies whether the frame is visible.
   */
  visible?: boolean
  /**
   * A SkiaValue representing whether the frame is highlighted.
   */
  highlighted?: SkiaValue<boolean>
  /**
   * Specifies whether the frame always shows the background.
   */
  alwaysShowBackground?: boolean
  /**
   * Specifies whether the frame always shows the border.
   */
  alwaysShowBorder?: boolean
  /**
   * The size of the internal square.
   */
  internalSquareSize?: number
}

/**
 * Frame component represents a rectangular frame with square corners.
 */
const Frame: React.FC<FrameProps> = ({
  height,
  width,
  color = colors.palette.cyan400,
  borderColor = colors.palette.cyan500,
  strokeWidth: rectStrokeWidth = 1.5,
  internalSquareBorderWidth = 3,
  visible = true,
  highlighted: highlightedParam,
  alwaysShowBackground = false,
  internalSquareSize: maxInternalSquareSize,
  alwaysShowBorder = false,
}) => {
  // Default value for highlighted
  const defaultHighlighted = useValue(false)

  // Computed value for highlighted, taking into account the current value of highlightedParam
  const highlighted = useComputedValue(() => {
    return highlightedParam?.current ?? defaultHighlighted.current
  }, [highlightedParam, defaultHighlighted])

  const containerWidth = width - internalSquareBorderWidth * 2
  const containerHeight = height - internalSquareBorderWidth * 2
  const offsetWidth = (width - containerWidth) / 2
  const offsetHeight = (height - containerHeight) / 2

  const rProgress = useDerivedValue(() => {
    return withTiming(visible ? 0 : 1, {
      duration: 200,
    })
  }, [visible])

  const progress = useValue(visible ? 0 : 1)

  useSharedValueEffect(() => {
    progress.current = rProgress.value
  }, rProgress)

  // Calculate the size of the square
  const squareSize = useMemo(() => {
    return maxInternalSquareSize ?? width * 0.1
  }, [maxInternalSquareSize, width])

  // Get the scale origin based on the corner type
  const getScaleOrigin = useCallback(
    (cornerType: CornerType) => {
      switch (cornerType) {
        case "bottomLeft":
          return {
            x: 0,
            y: height,
          }
        case "bottomRight":
          return {
            x: width,
            y: height,
          }
        case "topLeft":
          return {
            x: 0,
            y: 0,
          }
        case "topRight":
          return {
            x: width,
            y: 0,
          }
      }
    },
    [height, width],
  )

  const defaultScale = useValue(1)
  const scale = useComputedValue(() => {
    return 1 - progress.current
  }, [progress])

  const highlightedProgress = useValue(0.2)

  useValueEffect(highlighted, () => {
    runTiming(
      highlightedProgress,
      {
        to: highlighted.current ? 0.7 : 0.2,
      },
      {
        duration: 200,
      },
    )
  })

  const highlightedBackgroundOpacity = useComputedValue(() => {
    return Math.max(scale.current * highlightedProgress.current, alwaysShowBackground ? 0.1 : 0)
  }, [highlightedProgress, alwaysShowBackground, scale])

  return (
    <Canvas
      style={{
        height,
        width,
      }}
    >
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("topLeft")}>
        <FrameSquare
          x={offsetWidth / 2}
          y={offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
        />
      </Scaler>
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("topRight")}>
        <FrameSquare
          x={width - squareSize - offsetWidth / 2}
          y={offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
        />
      </Scaler>
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("bottomLeft")}>
        <FrameSquare
          x={offsetWidth / 2}
          y={height - squareSize - offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
        />
      </Scaler>
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("bottomRight")}>
        <FrameSquare
          x={width - squareSize - offsetWidth / 2}
          y={height - squareSize - offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
        />
      </Scaler>
      <AnimatedRectBorder
        x={offsetWidth}
        y={offsetHeight}
        width={containerWidth}
        height={containerHeight}
        color={borderColor}
        strokeWidth={rectStrokeWidth}
        scale={alwaysShowBorder ? defaultScale : scale}
      />
      <Rect
        x={offsetWidth}
        y={offsetHeight}
        width={containerWidth}
        height={containerHeight}
        color={colors.palette.almostBlack}
      />
      <Rect
        x={offsetWidth}
        y={offsetHeight}
        width={containerWidth}
        height={containerHeight}
        color={borderColor}
        opacity={highlightedBackgroundOpacity}
      />
    </Canvas>
  )
}

export { Frame }
export type { FrameProps }
