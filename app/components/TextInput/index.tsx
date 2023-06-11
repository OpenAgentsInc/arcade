import { Frame, FrameProps } from "../Frame"
import React, { useState } from "react"

import { StyleProp, TextStyle, StyleSheet } from "react-native"
import { TextInput, TextInputProps } from "../Text"
import { colors } from "app/theme"

/**
 * Props for the ArwesTextInput component.
 */
type ArwesTextInputProps = Omit<FrameProps, "visible" | "alwaysShowBackground"> &
  Omit<TextInputProps, "style"> & {
    /**
     * The style for the text input.
     */
    textInputStyle?: StyleProp<TextStyle>
  }

/**
 * ArwesTextInput component represents a text input with Arwes-styled frame.
 */
const ArwesTextInput: React.FC<ArwesTextInputProps> = ({
  color,
  borderColor,
  internalSquareBorderWidth,
  strokeWidth,
  style,
  textInputStyle,
  internalSquareSize,
  ...textInputProps
}) => {
  const [visible, setVisible] = useState(false)

  const contentStyle = StyleSheet.flatten(style)

  return (
    <Frame
      color={color}
      borderColor={borderColor}
      internalSquareBorderWidth={internalSquareBorderWidth}
      strokeWidth={strokeWidth}
      visible={visible}
      alwaysShowBackground
      internalSquareSize={internalSquareSize}
      alwaysShowBorder
      style={[style, styles.textInputContainer]}
    >
      <TextInput
        onFocus={() => {
          setVisible(true)
        }}
        onBlur={() => {
          setVisible(false)
        }}
        selectionColor={colors.palette.neutral100}
        cursorColor={colors.palette.neutral100}
        size="sm"
        numberOfLines={1}
        multiline={false}
        {...textInputProps}
        style={[
          textInputStyle,
          { color: colors.palette.neutral100, maxWidth: contentStyle.width, lineHeight: undefined },
          styles.content,
        ]}
      />
    </Frame>
  )
}

const styles = StyleSheet.create({
  content: {
    height: "100%",
  },
  textInputContainer: {
    paddingHorizontal: 15,
  },
})

export { ArwesTextInput }
