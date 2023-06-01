import { Canvas, Text, useFont, Fill } from "@shopify/react-native-skia"
import { BackgroundGradient } from "app/components/BackgroundGradient"
import { customFontsToLoad } from "app/theme"
import { StatusBar } from "expo-status-bar"
import { Dimensions, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const HEIGHT = 256
const WIDTH = SCREEN_WIDTH * 0.9
const CARD_HEIGHT = HEIGHT - 5
const CARD_WIDTH = WIDTH - 5

export const SkiaDemoScreen = () => {
  const fontSize = 60
  const font = useFont(customFontsToLoad.protomolecule, fontSize)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          // paddingTop: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <BackgroundGradient width={WIDTH} height={HEIGHT} />
        <View
          style={{
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
            backgroundColor: "black",
            position: "absolute",
            borderRadius: 20,
            zIndex: 300,
          }}
        >
          <Canvas style={{ flex: 1, margin: 10, zIndex: 400 }}>
            <Fill color="black" />
            <Text x={80} y={100} text="arcaDE" font={font} color="white" />
          </Canvas>
        </View>
      </View>
      {/*
      <Canvas style={{ flex: 1 }}>
        <Fill color="black" />
        <Text x={80} y={200} text="arcaDE" font={font} color="white" />
      </Canvas> */}
    </GestureHandlerRootView>
  )
}
