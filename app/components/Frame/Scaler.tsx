import { Group, SkiaValue, useComputedValue } from "@shopify/react-native-skia"
import React from "react"

/**
 * Props for the Scaler component.
 */
type ScalerProps = {
  /**
   * The scale origin coordinates.
   */
  scaleOrigin: { x: number; y: number }
  /**
   * The scale value.
   */
  scale: SkiaValue<number>
  /**
   * The children components to be scaled.
   */
  children: React.ReactNode
  /**
   * The type of scaling to apply.
   */
  type?: "scale" | "scaleX" | "scaleY"
}

/**
 * The Scaler component scales its children components based on the provided scale value.
 */
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
