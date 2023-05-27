import { Canvas, Text, useFont, Fill } from "@shopify/react-native-skia"
import { customFontsToLoad } from "app/theme"

export const SkiaDemoScreen = () => {
  const fontSize = 60
  const font = useFont(customFontsToLoad.protomolecule, fontSize)
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Text x={80} y={400} text="arcaDE" font={font} color="white" />
    </Canvas>
  )
}
