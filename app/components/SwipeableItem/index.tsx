import { useSharedValueEffect, useValue } from "@shopify/react-native-skia"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import React from "react"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { DonutChart } from "../AnimatedDonut"
import { StyleSheet, View } from "react-native"
import { Icon } from "../Icon"
import { colors } from "app/theme"

const clamp = (value: number, min: number, max: number) => {
  "worklet"
  return Math.max(min, Math.min(value, max))
}

const SwipeableItem: React.FC<{
  children?: React.ReactNode
  swipeDirection?: "right" | "left"
  onSwipeComplete?: () => void
}> = ({ children, swipeDirection = "left", onSwipeComplete }) => {
  const translateX = useSharedValue(0)
  const contextX = useSharedValue(0)

  const scrollableAmount = 100
  const maxTranslateX = swipeDirection === "right" ? scrollableAmount : 0
  const minTranslateX = swipeDirection === "left" ? -scrollableAmount : 0

  const progress = useDerivedValue(() => {
    return clamp(Math.abs(translateX.value) / scrollableAmount, 0, 1)
  })

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      contextX.value = translateX.value
    })
    .onUpdate((event) => {
      translateX.value = clamp(event.translationX + contextX.value, minTranslateX, maxTranslateX)
    })
    .onEnd(() => {
      if (progress.value === 1 && onSwipeComplete) {
        runOnJS(onSwipeComplete)()
      }
      translateX.value = withTiming(0)
    })

  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progress.value > 0.3 ? 1 : 0),
      transform: [
        {
          translateX: translateX.value / 10,
        },
      ],
    }
  })

  const percentageComplete = useValue(0)

  useSharedValueEffect(() => {
    percentageComplete.current = progress.value ** 2
  }, progress)

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 15,
              height: "80%",
              aspectRatio: 1,
              flex: 1,
            },
            rIconContainerStyle,
            swipeDirection !== "right" ? { right: -20 } : { left: -20 },
          ]}
        >
          <DonutChart
            radius={17.5 - 1.5}
            strokeWidth={3}
            percentageComplete={percentageComplete}
            color="white"
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
              zIndex: -1,
            }}
          >
            <View
              style={{
                height: 35,
                aspectRatio: 1,
                borderRadius: 20,
                backgroundColor: colors.palette.cyan950,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon icon="Forward" color="white" size={15} />
            </View>
          </View>
        </Animated.View>
        <Animated.View style={rAnimatedStyle}>{children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}

export { SwipeableItem }
