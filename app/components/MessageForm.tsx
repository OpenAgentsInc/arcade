import React, { useContext, useState } from "react"
import { ViewStyle } from "react-native"
import { Button, TextField } from "app/components"
import { SendIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { RelayContext } from "./RelayProvider"

export function MessageForm({ channelID }: { channelID: string }) {
  const pool: any = useContext(RelayContext);
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    const event = await pool.send({
      content: message,
      tags: [["e", channelID, "", "root"]],
      kind: 42,
    })
    if (event) {
      // reset state
      setMessage("")
      // log
      console.log('published event to channel:', channelID)
    }
  }

  return (
    <TextField
      placeholder="Message"
      placeholderTextColor={colors.palette.cyan500}
      style={$input}
      inputWrapperStyle={$inputWrapper}
      value={message}
      onChangeText={setMessage}
      autoCapitalize="none"
      RightAccessory={() => (
        <Button
          onPress={() => sendMessage()}
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
