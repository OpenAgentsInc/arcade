import React, { useState, useEffect } from 'react'
import { Platform, Keyboard, StyleSheet, Animated } from 'react-native'

export const KeyboardAvoider = (props) => {
  const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0))

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const keyboardWillShowSubscription = Keyboard.addListener(
      showEvent,
      (event) => {
        Animated.timing(keyboardOffset, {
          duration: event.duration,
          toValue: event.endCoordinates.height,
          useNativeDriver: false,
        }).start()
      }
    )

    const keyboardWillHideSubscription = Keyboard.addListener(
      hideEvent,
      (event) => {
        Animated.timing(keyboardOffset, {
          duration: event.duration,
          toValue: 0,
          useNativeDriver: false,
        }).start()
      }
    )

    return () => {
      keyboardWillShowSubscription.remove()
      keyboardWillHideSubscription.remove()
    }
  }, [])

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingBottom: keyboardOffset },
        props.containerStyle,
      ]}
    >
      {props.children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
