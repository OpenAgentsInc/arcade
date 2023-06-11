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

type AnimatedArcProps = {
  cx: number
  cy: number
  internalRadius: number
  color?: string
  strokeWidth?: number
  progress: SkiaValue<number>
  orientation?: "clockwise" | "counter-clockwise"
  showOpacityAnimation?: boolean
  showScaleAnimation?: boolean
}

const AnimatedArc: React.FC<AnimatedArcProps> = ({
  cx,
  cy,
  internalRadius,
  color,
  strokeWidth,
  progress,
  orientation = "clockwise",
}) => {
  const r = internalRadius / 2 + strokeWidth / 2

  const path = useComputedValue(() => {
    const skiaPath = Skia.Path.Make()
    skiaPath.addArc(rect(0, 0, internalRadius, internalRadius), 0, 90)
    skiaPath.addArc(rect(0, 0, internalRadius, internalRadius), 180, 90)
    skiaPath.transform(Skia.Matrix().translate(cx - internalRadius / 2, cy - internalRadius / 2))

    return skiaPath
  }, [internalRadius, cx, cy])

  const rotation = useComputedValue(() => {
    return progress.current * Math.PI * (orientation === "clockwise" ? 1 : -1)
  }, [progress])

  const internalRotateTransform = useComputedValue(() => {
    return [{ rotate: rotation.current }]
  }, [rotation])

  return (
    <>
      <Group>
        <Circle cx={cx} cy={cy} color={color} r={r}>
          <BlurMask style={"solid"} blur={r / 4} />
        </Circle>
        <Circle cx={cx} cy={cy} r={r} />
        <Group
          origin={{
            x: cx,
            y: cy,
          }}
          transform={internalRotateTransform}
        >
          <Path path={path} color={color} style={"stroke"} strokeWidth={strokeWidth} />
        </Group>
      </Group>
    </>
  )
}

export { AnimatedArc, AnimatedArcProps }
