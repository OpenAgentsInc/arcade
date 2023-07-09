import { StyleProp, ViewStyle } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import React from "react"

type TouchableFeedbackProps = {
  children: React.ReactNode
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  highlightColor?: string
  defaultColor?: string
}

const TouchableFeedback: React.FC<TouchableFeedbackProps> = ({
  children,
  onPress,
  style,
  highlightColor = "rgba(255,255,255,0.1)",
  defaultColor = "transparent",
}) => {
  const active = useSharedValue(false)
  const gesture = Gesture.Tap()
    .onBegin(() => {
      active.value = true
    })
    .onTouchesUp(() => {
      if (onPress) runOnJS(onPress)()
    })
    .onFinalize(() => {
      active.value = false
    })

  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(active.value ? highlightColor : defaultColor, {
        duration: 100,
      }),
    }
  }, [highlightColor, defaultColor])

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rAnimatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  )
}

export { TouchableFeedback }
