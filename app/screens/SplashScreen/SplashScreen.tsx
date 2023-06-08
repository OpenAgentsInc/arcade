import { Dimensions, StyleSheet, View } from "react-native" // Image,
import { SkiaDemoScreen } from "../SkiaDemo/SkiaDemoScreen"
import { Canvas, Blur, Image, ColorMatrix, useImage } from "@shopify/react-native-skia"

export const SplashScreen = () => {
  // return <SkiaDemoScreen />
  const image = useImage(require("./bootsplash_logo.png"))

  // Set variables for the screen width and height
  const screenWidth = Dimensions.get("window").width
  const screenHeight = Dimensions.get("window").height
  const x = screenWidth / 2 - 106
  const y = screenHeight / 2 - 106

  return (
    <Canvas style={styles.container}>
      <Image x={x} y={y} width={212} height={212} image={image} fit="cover">
        <Blur blur={2} mode="clamp">
          <ColorMatrix
            matrix={[
              -0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0, 0.015, 1.69, -0.703, 0, 0, 0,
              0, 0, 1, 0,
            ]}
          />
        </Blur>
      </Image>
    </Canvas>
  )

  // return (
  //   <Canvas style={styles.container}>
  //     <Image source={require("./bootsplash_logo.png")} />
  //   </Canvas>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
})
