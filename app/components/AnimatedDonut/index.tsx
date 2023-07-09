import React, { FC } from "react"

import {
  Canvas,
  Group,
  Path,
  Skia,
  SkiaMutableValue,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

interface CircularProgressProps {
  strokeWidth: number
  radius: number
  color: string
  // value between 0 and 1
  percentageComplete: SkiaMutableValue<number>
}

// This component is used to display a circular progress bar
// It will animate the stroke of the circle
export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  color,
}) => {
  const innerRadius = radius - strokeWidth / 2

  const canvasSize = useValue({
    width: 0,
    height: 0,
  })

  const path = Skia.Path.Make()

  path.addCircle(radius, radius, innerRadius)

  const skiaTransform = useComputedValue(() => {
    return [
      {
        translateX: canvasSize.current.width / 2 - radius,
      },
      {
        translateY: canvasSize.current.height / 2 - radius,
      },
    ]
  }, [canvasSize])

  return (
    <Canvas onSize={canvasSize} style={styles.container}>
      <Group transform={skiaTransform}>
        <Path
          path={path}
          color={color}
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
      </Group>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center" },
})
