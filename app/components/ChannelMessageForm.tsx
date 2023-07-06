import React, { useRef, useState } from "react"
import {
  ImageStyle,
  Platform,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native"
import { Button, TextField, Text, AutoImage } from "app/components"
import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { Formik } from "formik"
import { ChannelManager } from "app/arclib/src"
import { launchImageLibrary } from "react-native-image-picker"

export function ChannelMessageForm({
  channelManager,
  channelId,
  privkey,
}: {
  channelManager: ChannelManager
  channelId: string
  privkey: string
}) {
  const [loading, setLoading] = useState(false)
  const [attached, setAttached] = useState(null)

  // formik
  const formikRef = useRef(null)

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
      }
    } else {
      setLoading(false)
    }
  }

  const removeAttached = () => {
    setAttached(null)
  }

  const createEvent = async (data) => {
    // no popup here please
    if (!attached && data.content.length === 0) {
      alert("Message cannot be empty")
      return
    }

    let content = data.content
    if (attached) {
      content = data.content + " " + attached
    }

    // send message
    const message = await channelManager.send({
      channel_id: channelId,
      content,
      is_private: !!privkey,
    })

    if (message) {
      // reset form
      formikRef.current?.resetForm()
      setAttached(null)
      setLoading(false)
      // log, todo: remove
      console.log("published event to channel:", message.id)
    } else {
      alert("Failed to publish")
    }
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        content: "",
      }}
      onSubmit={(values) => createEvent(values)}
    >
      {({ handleChange, handleBlur, submitForm, values }) => (
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
            placeholder={attached ? "Caption" : "Message"}
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            onSubmitEditing={() => submitForm()}
            value={values.content}
            autoCapitalize="none"
            autoCorrect={true}
            autoComplete="name"
            LeftAccessory={() => (
              <Button
                onPress={() => imagePicker()}
                LeftAccessory={() => (
                  <PaperclipIcon width={24} height={24} style={{ color: colors.palette.cyan700 }} />
                )}
                style={$imageButton}
              />
            )}
            RightAccessory={() => (
              <Button
                onPress={() => submitForm()}
                LeftAccessory={() => (
                  <ArrowUpIcon width={20} height={20} style={{ color: colors.palette.cyan100 }} />
                )}
                style={$sendButton}
              />
            )}
          />
        </>
      )}
    </Formik>
  )
}

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
}

const $input: ViewStyle = {
  height: 40,
  borderWidth: 0,
  borderRadius: 100,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
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

const $imageButton: ViewStyle = {
  width: 30,
  height: 30,
  minHeight: 30,
  borderRadius: 100,
  backgroundColor: "transparent",
  borderWidth: 0,
  flexShrink: 0,
  marginLeft: spacing.small,
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
