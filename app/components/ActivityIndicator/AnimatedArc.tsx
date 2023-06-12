import {
  BlurMask,
  Circle,
  Group,
  Path,
  Skia,
  SkiaValue,
  rect,
  useComputedValue,
} from "@shopify/react-native-skia"
import React from "react"

/**
 * Props for the AnimatedArc component.
 */
type AnimatedArcProps = {
  /**
   * The x-coordinate of the center point.
   */
  cx: number
  /**
   * The y-coordinate of the center point.
   */
  cy: number
  /**
   * The radius of the internal circle.
   */
  internalRadius: number
  /**
   * The color of the arcs (optional).
   */
  color?: string
  /**
   * The stroke width of the arcs (optional).
   */
  strokeWidth?: number
  /**
   * The progress of the arcs.
   */
  progress: SkiaValue<number>
  /**
   * The orientation of the arcs. Can be "clockwise" or "counter-clockwise" (optional).
   */
  orientation?: "clockwise" | "counter-clockwise"
  /**
   * Flag to enable opacity animation (optional).
   */
  showOpacityAnimation?: boolean
  /**
   * Flag to enable scale animation (optional).
   */
  showScaleAnimation?: boolean
}

/**
 * AnimatedArc component renders animated arcs based on the provided props.
 */
const AnimatedArc: React.FC<AnimatedArcProps> = ({
  cx,
  cy,
  internalRadius,
  color,
  strokeWidth,
  progress,
  orientation = "clockwise",
}) => {
  // Calculate the outer radius of the arcs
  const r = internalRadius / 2 + strokeWidth / 2

  // Compute the path of the arcs
  const path = useComputedValue(() => {
    const skiaPath = Skia.Path.Make()
    skiaPath.addArc(rect(0, 0, internalRadius, internalRadius), 0, 90)
    skiaPath.addArc(rect(0, 0, internalRadius, internalRadius), 180, 90)
    skiaPath.transform(Skia.Matrix().translate(cx - internalRadius / 2, cy - internalRadius / 2))

    return skiaPath
  }, [internalRadius, cx, cy])

  // Compute the rotation angle based on the progress and orientation
  const rotation = useComputedValue(() => {
    return progress.current * Math.PI * (orientation === "clockwise" ? 1 : -1)
  }, [progress])

  // Compute the internal rotation transform based on the rotation angle
  const internalRotateTransform = useComputedValue(() => {
    return [{ rotate: rotation.current }]
  }, [rotation])

  return (
    <>
      <Group>
        {/* Render a circle with blur effect */}
        <Circle cx={cx} cy={cy} color={color} r={r}>
          <BlurMask style={"solid"} blur={r / 4} />
        </Circle>
        {/* Render a circle */}
        <Circle cx={cx} cy={cy} r={r} />
        <Group
          origin={{
            x: cx,
            y: cy,
          }}
          transform={internalRotateTransform}
        >
          {/* Render the arcs */}
          <Path path={path} color={color} style={"stroke"} strokeWidth={strokeWidth} />
        </Group>
      </Group>
    </>
  )
}

export { AnimatedArc, AnimatedArcProps }
