import React from "react"
import type { TextInputProps, TextProps as RNTextProps } from "react-native"
import { TextInput } from "react-native"
import Animated, { useAnimatedProps } from "react-native-reanimated"

Animated.addWhitelistedNativeProps({ text: true })

interface TextProps extends Omit<TextInputProps, "value" | "style"> {
  text: Animated.SharedValue<string>
  style?: Animated.AnimateProps<RNTextProps>["style"]
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

// Deeply Inspired by wcandillon Redash component: https://github.dev/wcandillon/react-native-redash
const ReText = (props: TextProps) => {
  const { style, text, ...rest } = props
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      // Here we use any because the text prop is not available in the type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
  })
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={style || undefined}
      {...rest}
      {...{ animatedProps }}
    />
  )
}

export default ReText
