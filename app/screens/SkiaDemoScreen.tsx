import { Canvas, Text, useFont, Fill } from "@shopify/react-native-skia"
import { customFontsToLoad } from "app/theme"

export const SkiaDemoScreen = () => {
  const fontSize = 32
  const font = useFont(customFontsToLoad.protomolecule, fontSize)
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="white" />
      <Text x={0} y={fontSize} text="Hello World" font={font} />
    </Canvas>
  )
}
