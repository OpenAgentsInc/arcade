import React, { useState } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  Platform,
  Pressable,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { AutoImage, Button, TextField, Text } from "app/components"
import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { launchImageLibrary } from "react-native-image-picker"
import type { PrivateMessageManager } from "app/arclib/src/private"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

export const DirectMessageForm = observer(function DirectMessageForm({
  dms,
  recipient,
  legacy,
  textInputRef,
  onSubmit,
}: {
  dms: PrivateMessageManager
  recipient: string
  legacy: boolean
  textInputRef?: React.RefObject<TextInput>
  onSubmit?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [attached, setAttached] = useState(null)
  const [value, setValue] = useState("")

  const {
    userStore: { replyTo, clearReply },
  } = useStores()

  const imagePicker = async () => {
    // start loading
    setLoading(true)
    // open image picker
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
          setAttached(url)
          setLoading(false)
        }
      } else {
        alert(res.statusText)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  const removeAttached = () => {
    setAttached(null)
  }

  const submit = async () => {
    if (!attached && value.length === 0) {
      // user does not need feedback, they were probably just trying to close the keyboard
      return
    }

    let content = value
    if (attached) {
      content = content + " " + attached
    }

    // send message
    if (legacy) {
      const ev = await dms.send(recipient, content, replyTo)
      if (!ev.id) {
        console.log("Failed to publish")
      }
    } else {
      const ev = await dms.send44X(recipient, content, replyTo)
      if (!ev.id) {
        console.log("Failed to publish")
      }
    }

    // reset state
    setValue("")
    setAttached(null)
    setLoading(false)

    // reset reply to
    onSubmit?.()
    clearReply()
  }

  return (
    <>
      {loading && (
        <View style={$attached}>
          <ActivityIndicator
            style={$attachedIndicator}
            color={colors.palette.cyan500}
            animating={loading}
          />
        </View>
      )}
      {attached && (
        <View style={$attached}>
          <View style={$attachedContent}>
            <AutoImage source={{ uri: attached }} style={$attachedImage} />
            <Text text="Attached image" style={$attachedText} />
          </View>
          <Pressable onPress={removeAttached} style={$attachedRemove}>
            <XIcon width={16} height={16} color={colors.palette.cyan700} />
          </Pressable>
        </View>
      )}
      <View style={$borderTop} />
      <TextField
        ref={textInputRef}
        placeholder="Message"
        placeholderTextColor={colors.palette.cyan500}
        style={$input}
        inputWrapperStyle={$inputWrapper}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={() => submit()}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={true}
        LeftAccessory={() => (
          <View style={$leftAccessory}>
            <Button
              onPress={() => imagePicker()}
              LeftAccessory={() => (
                <PaperclipIcon width={24} height={24} style={{ color: colors.palette.cyan700 }} />
              )}
              style={$imageButton}
            />
          </View>
        )}
        RightAccessory={() => {
          if (attached || (value.length > 0 && /\S/.test(value))) {
            return (
              <Button
                onPress={() => submit()}
                LeftAccessory={() => (
                  <ArrowUpIcon width={20} height={20} style={{ color: colors.palette.cyan100 }} />
                )}
                style={$sendButton}
              />
            )
          } else {
            return <View style={$blankButton} />
          }
        }}
      />
    </>
  )
})

const $borderTop: ViewStyle = {
  width: "100%",
  height: 1,
  backgroundColor: colors.palette.cyan900,
}

const $inputWrapper: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.palette.overlay20,
  borderWidth: 0,
  borderRadius: 0,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.large,
  gap: spacing.small,
  minHeight: 40,
}

const $input: ViewStyle = {
  minHeight: 40,
  borderWidth: 0,
  borderRadius: 20,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.tiny,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
}

const $sendButton: ViewStyle = {
  width: 40,
  height: 40,
  minHeight: 40,
  backgroundColor: colors.palette.cyan600,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
  marginRight: spacing.small,
}

const $blankButton: ViewStyle = {
  width: 5,
  height: 40,
}

const $imageButton: ViewStyle = {
  width: 30,
  height: 30,
  minHeight: 30,
  borderRadius: 100,
  backgroundColor: "transparent",
  borderWidth: 0,
  flexShrink: 0,
  marginLeft: spacing.small,
  marginBottom: spacing.tiny,
}

const $attached: ViewStyle = {
  width: "100%",
  height: 72,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.small,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: spacing.small,
}

const $attachedContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.small,
}

const $attachedImage: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: spacing.tiny,
}

const $attachedText: TextStyle = {
  color: colors.palette.cyan500,
}

const $attachedRemove: ViewStyle = {
  width: 40,
  height: 40,
  backgroundColor: "transparent",
  alignItems: "center",
  justifyContent: "center",
}

const $attachedIndicator: ViewStyle = {
  alignSelf: "center",
}

const $leftAccessory: ViewStyle = {
  flexDirection: "row",
  flexWrap: "nowrap",
  marginTop: "auto",
}
