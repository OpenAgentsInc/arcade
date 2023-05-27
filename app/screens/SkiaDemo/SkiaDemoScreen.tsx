import { Canvas, Text, useFont, Fill } from "@shopify/react-native-skia"
import { customFontsToLoad } from "app/theme"
import { StatusBar } from "expo-status-bar"
import React, { useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { BackgroundGradient } from "app/components/BackgroundGradient"
import json from "../../../assets/top.json"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const HEIGHT = 256
const WIDTH = SCREEN_WIDTH * 0.9

const CARD_HEIGHT = HEIGHT - 5
const CARD_WIDTH = WIDTH - 5

function App() {
  // console.log("JSON:", json)

  function countEventKinds(eventsJson: any) {
    const counts = { 40: 0, 41: 0, 42: 0 }
    console.log(eventsJson)
    console.log("------")
    console.log(typeof eventsJson)

    // for (const event of eventsJson) {
    // counts[event.ev.kind]++
    // console.log(event)
    // console.log("----")
    // }
    // for (const kind in eventsJson) {
    // const event = eventsJson[kind]
    // counts[event.ev.kind]++
    // }
    return counts
  }

  function parseAndExtract(data) {
    let result = []

    // Loop through each key in the data object
    for (let key in data) {
      // Check if the "ev" property exists and is an object
      if (data[key].ev && typeof data[key].ev === "object") {
        // Try to parse the "content" property as JSON
        // console.log("data[key]", data[key])

        // If the event kind is 42, it's a message
        if (data[key].ev.kind === 42) {
          console.log("message: " + data[key].ev.content)
        }

        // try {
        //   let content = JSON.parse(data[key].ev.content)
        //   console.log(content)

        //   // Check if the "message" property exists in the parsed content
        //   if (content.message) {
        //     // If it does, push it to the result array
        //     result.push(content.message)
        //   }
        // } catch (e) {
        //   // If the "content" property couldn't be parsed as JSON, just ignore it
        //   console.log("ignoring")
        //   continue
        // }
      }
    }

    return result
  }

  useEffect(() => {
    const result = parseAndExtract(json)
    console.log("result:", result)
  }, [])

  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const font = useFont(customFontsToLoad.protomolecule, 66)
  const font2 = useFont(customFontsToLoad.spaceGroteskBold, 24)

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP),
      )
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP),
      )
    })
    .onUpdate((event) => {
      // topLeft (10deg, -10deg)
      // topRight (10deg, 10deg)
      // bottomRight (-10deg, 10deg)
      // bottomLeft (-10deg, -10deg)

      rotateX.value = interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP)
      rotateY.value = interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP)
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0)
      rotateY.value = withTiming(0)
    })

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`
    const rotateYvalue = `${rotateY.value}deg`

    return {
      transform: [
        {
          perspective: 300,
        },
        { rotateX: rotateXvalue },
        { rotateY: rotateYvalue },
      ],
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
              backgroundColor: "black",
              position: "absolute",
              borderRadius: 20,
              zIndex: 300,
            },
            rStyle,
          ]}
        >
          <Canvas style={{ flex: 1, margin: 10, zIndex: 400 }}>
            {/* <Fill color="black" /> */}
            <Text x={36} y={100} text="arcaDE" font={font} color="cyan" />
            <Text x={126} y={144} text="Test." font={font2} color="white" />
          </Canvas>
          <View
            style={{
              position: "absolute",
              bottom: "10%",
              left: "10%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: 50,
                aspectRatio: 1,
                borderRadius: 25,
                backgroundColor: "#272F46",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  height: 20,
                  width: 80,
                  borderRadius: 25,
                  backgroundColor: "#272F46",
                }}
              />
              <View
                style={{
                  height: 20,
                  width: 80,
                  borderRadius: 25,
                  backgroundColor: "#272F46",
                }}
              />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
})

export const SkiaDemoScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  )
}
