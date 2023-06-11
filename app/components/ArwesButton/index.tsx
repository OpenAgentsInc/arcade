import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Frame, FrameProps } from "../Frame"
import React, { useCallback } from "react"
import { useValue } from "@shopify/react-native-skia"
import Animated, { runOnJS } from "react-native-reanimated"

type ArwesButtonProps = FrameProps & {
  onPress?: () => void
  onPressIn?: () => void
}

const ArwesButton: React.FC<ArwesButtonProps> = ({ onPress, onPressIn, ...frameProps }) => {
  const highlighted = useValue(false)

  const setHighlightedStatus = useCallback(
    (status: boolean) => {
      highlighted.current = status
    },
    [highlighted],
  )

  const gesture = Gesture.Tap()
    .onBegin(() => {
      runOnJS(setHighlightedStatus)(true)
      if (onPressIn) runOnJS(onPressIn)()
    })
    .onTouchesUp(() => {
      runOnJS(setHighlightedStatus)(false)
      if (onPress) runOnJS(onPress)()
    })
    .onFinalize(() => {
      runOnJS(setHighlightedStatus)(false)
    })
    .maxDuration(5000)

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View>
        <Frame {...frameProps} highlighted={highlighted} />
      </Animated.View>
    </GestureDetector>
  )
}

export { ArwesButton }
