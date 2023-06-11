import {
  Canvas,
  Rect,
  useComputedValue,
  Selector,
  useValue,
  runTiming,
  SkiaValue,
  useValueEffect,
} from "@shopify/react-native-skia"

import React, { useCallback, useEffect } from "react"
import { CornerType, FrameSquare } from "./FrameSquare"
import { Scaler } from "./Scaler"
import { AnimatedRectBorder } from "./AnimatedRectBorder"
import { colors } from "app/theme"

type FrameProps = {
  height: number
  width: number
  color?: string
  borderColor?: string
  internalSquareBorderWidth?: number
  strokeWidth?: number
  visible?: boolean
  highlighted?: SkiaValue<boolean>
  alwaysShowBackground?: boolean
  alwaysShowBorder?: boolean
  internalSquareSize?: number
}

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
  const defaultHighlighted = useValue(false)
  const highlighted = useComputedValue(() => {
    return highlightedParam?.current ?? defaultHighlighted.current
  }, [highlightedParam, defaultHighlighted])
  const containerWidth = width - internalSquareBorderWidth * 2
  const containerHeight = height - internalSquareBorderWidth * 2
  const offsetWidth = (width - containerWidth) / 2
  const offsetHeight = (height - containerHeight) / 2

  const progress = useValue(0)

  useEffect(() => {
    runTiming(
      progress,
      {
        to: visible ? 0 : 1,
      },
      {
        duration: 200,
      },
    )
  }, [visible])

  const squareSize = (() => {
    return maxInternalSquareSize ?? width * 0.1
  })()

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
    return scale.current * highlightedProgress.current
  }, [highlightedProgress, scale])

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
          innerSquareType={"bottomLeft"}
        />
      </Scaler>
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("topRight")}>
        <FrameSquare
          x={width - squareSize - offsetWidth / 2}
          y={offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
          innerSquareType={"bottomRight"}
        />
      </Scaler>
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("bottomLeft")}>
        <FrameSquare
          x={offsetWidth / 2}
          y={height - squareSize - offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
          innerSquareType={"topRight"}
        />
      </Scaler>
      <Scaler scale={scale} scaleOrigin={getScaleOrigin("bottomRight")}>
        <FrameSquare
          x={width - squareSize - offsetWidth / 2}
          y={height - squareSize - offsetHeight / 2}
          size={squareSize}
          color={color}
          strokeWidth={internalSquareBorderWidth}
          innerSquareType={"topLeft"}
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
        opacity={Selector(scale, (s) => s * 0.9)}
      />
      <Rect
        x={offsetWidth}
        y={offsetHeight}
        width={containerWidth}
        height={containerHeight}
        color={borderColor}
        opacity={alwaysShowBackground ? 0.3 : highlightedBackgroundOpacity}
      />
    </Canvas>
  )
}

export { Frame }
export type { FrameProps }
