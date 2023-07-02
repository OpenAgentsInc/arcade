import React, { useCallback, useContext } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  MeasuredDimensions,
  measure,
  runOnJS,
  useAnimatedRef,
} from "react-native-reanimated"
import { BlurredPopupContext, PopupOptionType } from "./BlurredContext"

type TouchablePopupHandlerProps = {
  children?: React.ReactNode
  highlightedChildren?: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  options: PopupOptionType[]
}

const TouchablePopupHandler: React.FC<TouchablePopupHandlerProps> = ({
  children,
  style,
  onPress,
  highlightedChildren,
  options,
}) => {
  const viewRef = useAnimatedRef<Animated.View>()
  const { showPopup } = useContext(BlurredPopupContext)

  const wrappedJsShowPopup = useCallback(
    (layout: MeasuredDimensions) => {
      showPopup({ layout, node: highlightedChildren ?? children, options })
    },
    [showPopup, options],
  )

  const longPressGesture = Gesture.LongPress()
    .minDuration(1000)
    .onStart(() => {
      const dimensions = measure(viewRef) // Sync measure
      runOnJS(wrappedJsShowPopup)(dimensions)
    })

  const tapGesture = Gesture.Tap().onTouchesUp(() => {
    if (onPress) runOnJS(onPress)()
  })

  const gesture = Gesture.Exclusive(longPressGesture, tapGesture)

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View ref={viewRef} style={style}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

export { TouchablePopupHandler }
