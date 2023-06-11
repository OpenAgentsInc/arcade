import { Group, SkiaValue, useComputedValue } from "@shopify/react-native-skia"
import React from "react"

type ScalerProps = {
  scaleOrigin: { x: number; y: number }
  scale: SkiaValue<number>
  children: React.ReactNode
  type?: "scale" | "scaleX" | "scaleY"
}

const Scaler = ({ children, scale, scaleOrigin, type = "scale" }: ScalerProps) => {
  const scaleTransform = useComputedValue(() => {
    return [
      {
        [type]: scale.current,
      } as {
        scale: number
      },
    ]
  }, [scale])

  return (
    <Group origin={scaleOrigin} transform={scaleTransform}>
      {children}
    </Group>
  )
}

export { Scaler }
