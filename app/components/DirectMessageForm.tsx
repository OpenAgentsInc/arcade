import React, { useState } from "react"
import { Platform, View, ViewStyle } from "react-native"
import { Button, TextField } from "app/components"
import { ImageIcon, SendIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { launchImageLibrary } from "react-native-image-picker"

export function DirectMessageForm({ dms, replyTo }: { dms: any; replyTo: string }) {
  const [value, setValue] = useState("")

  const imagePicker = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: 1 })
    if (!result.didCancel) {
      const filename = result.assets[0].fileName
      const filetype = result.assets[0].type

      const data: any = new FormData()
      data.append("image", {
        name: filename,
        type: filetype,
        uri:
          Platform.OS === "ios"
            ? result.assets[0].uri.replace("file://", "")
            : result.assets[0].uri,
      })

      const res = await fetch("https://nostrimg.com/api/upload", {
        body: data,
        method: "POST",
        headers: {
          accept: "application/json",
        },
      })

      if (res.ok) {
        const data = await res.json()
        if (typeof data?.imageUrl === "string" && data.success) {
          const url = new URL(data.imageUrl).toString()
          setValue((prev) => prev + " " + url)
        }
      }
    }
  }

  const submit = async () => {
    if (!value) return
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
      autoCorrect={false}
      RightAccessory={() => (
        <View style={$rightButtonGroup}>
          <Button
            onPress={() => imagePicker()}
            LeftAccessory={() => <ImageIcon style={{ color: colors.text }} />}
            style={$imageButton}
          />
          <Button
            onPress={() => submit()}
            LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
            style={$sendButton}
          />
        </View>
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

const $imageButton: ViewStyle = {
  width: 45,
  height: 45,
  minHeight: 45,
  backgroundColor: colors.palette.cyan900,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
}

const $rightButtonGroup: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.tiny,
}
