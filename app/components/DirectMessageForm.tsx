import React, { useState } from "react"
import { ViewStyle } from "react-native"
import { Button, TextField } from "app/components"
import { SendIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"

export function DirectMessageForm({ dms, replyTo }: { dms: any; replyTo: string }) {
  const [value, setValue] = useState("")

  const submit = async () => {
    if (!value) alert("Please enter a message")
    // send message
    dms.send(replyTo, value)
    // reset state
    setValue("")
  }

  return (
    <TextField
      placeholder="Message"
      placeholderTextColor={colors.palette.cyan500}
      style={$input}
      inputWrapperStyle={$inputWrapper}
      onChangeText={(text) => setValue(text)}
      onSubmitEditing={() => submit()}
      value={value}
      autoCapitalize="none"
      RightAccessory={() => (
        <Button
          onPress={() => submit()}
          LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
          style={$sendButton}
        />
      )}
    />
  )
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
  width: "100%",
  height: 45,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: 100,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
}

const $sendButton: ViewStyle = {
  width: 45,
  height: 45,
  minHeight: 45,
  backgroundColor: colors.palette.cyan500,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
}
