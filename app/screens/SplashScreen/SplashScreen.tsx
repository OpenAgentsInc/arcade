import { Dimensions, StyleSheet } from "react-native"
import { Canvas, Blur, Image, useImage } from "@shopify/react-native-skia"
import { useEffect, useState } from "react"

export const SplashScreen = () => {
  const image = useImage(require("./bootsplash_logo.png"))
  const screenWidth = Dimensions.get("window").width
  const screenHeight = Dimensions.get("window").height
  const x = screenWidth / 2 - 106
  const y = screenHeight / 2 - 106
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    console.log(blur)
    if (blur < 300) {
      setTimeout(() => {
        setBlur(blur + 2.75)
      }, 20)
    }
  }, [blur])

  return (
    <Canvas style={styles.container}>
      <Image x={x} y={y} width={212} height={212} image={image} fit="cover">
        <Blur blur={blur} mode="clamp" />
      </Image>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
})
