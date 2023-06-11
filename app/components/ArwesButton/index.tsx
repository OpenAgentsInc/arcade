import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Frame, FrameProps } from "../Frame"
import React, { useCallback } from "react"
import { useValue } from "@shopify/react-native-skia"
import Animated, { runOnJS } from "react-native-reanimated"

type ArwesButtonProps = FrameProps & {
  onPress?: () => void // Callback function for the onPress event
  onPressIn?: () => void // Callback function for the onPressIn event
}

/**
 * ArwesButton component is a customizable button with tap gesture support.
 */
const ArwesButton: React.FC<ArwesButtonProps> = ({ onPress, onPressIn, ...frameProps }) => {
  // State for tracking whether the button is highlighted
  // Note: The value will be updated on a different thread (not the JS thread)
  const highlighted = useValue(false)

  /**
   * Sets the highlighted status of the button.
   * @param status - The highlighted status to set
   */
  const setHighlightedStatus = useCallback(
    (status: boolean) => {
      highlighted.current = status
    },
    [highlighted],
  )

  // Create a tap gesture and define its event callbacks
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
    .maxDuration(5000) // Set a maximum duration for the gesture

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View>
        <Frame {...frameProps} highlighted={highlighted} />
        {/* Render the Frame component with provided props and highlighted status */}
      </Animated.View>
    </GestureDetector>
  )
}

export { ArwesButton }
