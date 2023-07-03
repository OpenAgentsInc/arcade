import { useSendMessage } from "app/hooks/useSendMessage"
import { colors, spacing } from "app/theme"
import { ArrowUpIcon, Send } from "lucide-react-native"
// import { useUser } from 'lib/hooks'
// import { useSendMessage } from 'lib/hooks/useSendMessage'
import { useRef, useState } from "react"
import { Alert, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button } from "../Button"
import { TextField } from "../TextField"
// import { Input, XStack } from "tamagui"

export const MessageInput = ({ conversationId, conversationType }) => {
  const { mutate } = useSendMessage()
  const [text, setText] = useState("")
  const inputBoxRef = useRef<TextInput | null>(null)
  // const { userId } = useUser()
  const userId = "123"
  const submitInput = (enteredText) => {
    if (!userId) {
      Alert.alert("Couldn't find your user ID - try reopening the app")
      return
    }
    if (!enteredText || enteredText.length < 1) {
      Alert.alert("Message too short", "What is that, a message for ants?")
      return
    }
    setText("")
    inputBoxRef.current?.clear()
    inputBoxRef.current?.blur()

    const textToSend = enteredText ?? text

    // console.log('Sending message:', textToSend)
    if (typeof userId !== "string") return
    console.log("GOT:")
    console.log({ message: textToSend, conversationId, conversationType })
    mutate({ message: textToSend, conversationId, conversationType })
  }
  return (
    <View
      style={
        {
          // width: 400,
          // alignItems: "center",
          // padding: 4,
          // marginVertical: 4,
          // backgroundColor: "gray",
        }
      }
    >
      <TextField
        placeholder={
          conversationType === "dialogue" ? `Write your message here` : "Ask your question here"
        }
        placeholderTextColor={colors.palette.cyan500}
        style={$input}
        inputWrapperStyle={$inputWrapper}
        onChangeText={(text: string) => setText(text)}
        // onBlur={handleBlur("content")}
        // onSubmitEditing={() => submitForm()}
        // value={values.content}
        autoCapitalize="none"
        autoCorrect={true}
        autoComplete="name"
        RightAccessory={() => (
          <Button
            onPress={() => submitInput(text)}
            LeftAccessory={() => (
              <ArrowUpIcon width={20} height={20} style={{ color: colors.palette.cyan100 }} />
            )}
            style={$sendButton}
          />
        )}
      />

      {/* <Input
        color="#fff"
        borderColor="#2A2A2B"
        backgroundColor="transparent"
        size="$6"
        placeholder={
          conversationType === "dialogue" ? `Write your message here` : "Ask your question here"
        }
        placeholderTextColor="$gray9"
        autoCorrect={false}
        onChangeText={(text: string) => setText(text)}
        ref={inputBoxRef}
        spellCheck={false}
        fg={1}
        fs={1}
      /> */}

      {/* <TouchableOpacity activeOpacity={0.8} onPress={() => submitInput(text)}>
        <Send color="#43A081" size={34} style={{ marginLeft: 13 }} />
      </TouchableOpacity> */}
    </View>
  )
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
  flexGrow: 1,
  flexShrink: 1,
  height: 40,
  borderWidth: 0,
  borderRadius: 100,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  // alignSelf: "center",
  // flex: 1,
}

export const $sendButton: ViewStyle = {
  width: 40,
  height: 40,
  minHeight: 40,
  backgroundColor: colors.palette.cyan600,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
  marginRight: spacing.small,
}
