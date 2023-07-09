import { useSharedValueEffect, useValue } from "@shopify/react-native-skia"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import React, { useMemo } from "react"
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { DonutChart } from "../AnimatedDonut"
import { StyleSheet, View } from "react-native"
import { Icon } from "../Icon"
import { colors } from "app/theme"

// This function is used to clamp a value between a min and a max
// It must be a worklet in order to be used into the Pan Gesture Handler
// Otherwise the animation will crash
const clamp = (value: number, min: number, max: number) => {
  "worklet"
  return Math.max(min, Math.min(value, max))
}

const donutSpringConfig = {
  overshootClamping: true,
  mass: 0.5,
}

// This component is used to provide a swipeable item
// It will animate the swipe of the item
// And when the swipe is completed it will call the onSwipeComplete callback if provided
const SwipeableItem: React.FC<{
  children?: React.ReactNode
  swipeDirection?: "right" | "left"
  onSwipeComplete?: () => void
  maxScrollableAmount?: number
}> = ({
  children,
  swipeDirection = "left",
  onSwipeComplete,
  maxScrollableAmount: scrollableAmount = 100,
}) => {
  const translateX = useSharedValue(0)
  const contextX = useSharedValue(0)

  const maxTranslateX = swipeDirection === "right" ? scrollableAmount : 0
  const minTranslateX = swipeDirection === "left" ? -scrollableAmount : 0

  const progress = useDerivedValue(() => {
    return clamp(Math.abs(translateX.value) / scrollableAmount, 0, 1)
  }, [scrollableAmount])

  const hasBeenFullySwiped = useSharedValue(false)

  const panGesture = Gesture.Pan()
    // Needed otherwise the PanGesture will conflict with the FlashList
    .activeOffsetX([-10, 10])
    .onBegin(() => {
      contextX.value = translateX.value
    })
    .onUpdate((event) => {
      // We clamp the translation between the min and max
      // In order to avoid the user to swipe too much
      translateX.value = clamp(event.translationX + contextX.value, minTranslateX, maxTranslateX)
    })
    .onEnd(() => {
      if (progress.value === 1 && onSwipeComplete) {
        // Since we are in a worklet we need to use the runOnJS helper
        // in order to call the onSwipeComplete callback (which is not a worklet)
        runOnJS(onSwipeComplete)()
      }
      translateX.value = withTiming(0)
    })

  useAnimatedReaction(
    () => {
      return progress.value
    },
    (value) => {
      if (value === 0) {
        hasBeenFullySwiped.value = false
      } else if (value === 1) {
        hasBeenFullySwiped.value = true
      }
    },
  )

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
          // Even the icon is translated but with a lower value (proportional to the swipe progress)
          translateX: translateX.value / 10,
        },
      ],
    }
  })

  // This value is used to animate the donut chart
  const percentageComplete = useValue(0)

  // Since the progress is a value between 0 and 1 (through Reanimated)
  // we need to assign it to the percentageComplete which is a value between 0 and 1 (defined by Skia)
  // In order to do that, we use this useSharedValueEffect hook
  useSharedValueEffect(() => {
    percentageComplete.current = progress.value ** 2
  }, progress)

  const rDonutStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(hasBeenFullySwiped.value ? 0 : 1, donutSpringConfig),
      transform: [
        {
          scale: withSpring(hasBeenFullySwiped.value ? 2 : 1, donutSpringConfig),
        },
      ],
    }
  })

  const progressIndicatorContainerStyle = useMemo(() => {
    return [styles.donutContainer, swipeDirection !== "right" ? { right: -20 } : { left: -20 }]
  }, [])

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        <Animated.View style={[progressIndicatorContainerStyle, rIconContainerStyle]}>
          <View style={styles.absoluteCenter}>
            <View
              style={[
                styles.iconContainer,
                {
                  transform: [
                    {
                      // flip the icon if the swipe direction is right
                      scale: swipeDirection === "left" ? -1 : 1,
                    },
                  ],
                },
              ]}
            >
              <Icon icon="Forward" color="white" size={15} />
            </View>
          </View>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
              },
              rDonutStyle,
            ]}
          >
            <DonutChart
              radius={17.5}
              strokeWidth={3}
              percentageComplete={percentageComplete}
              color="rgba(255,255,255,0.5)"
            />
          </Animated.View>
        </Animated.View>
        <Animated.View style={rAnimatedStyle}>{children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  absoluteCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  donutContainer: {
    aspectRatio: 1,
    flex: 1,
    height: "80%",
    position: "absolute",
    top: 15,
  },
  iconContainer: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: colors.palette.cyan950,
    borderRadius: 20,
    height: 35,
    justifyContent: "center",
  },
})

export { SwipeableItem }
