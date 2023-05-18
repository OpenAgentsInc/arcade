import React, { useState } from "react"
import { ViewStyle } from "react-native"
import { Button, TextField } from "app/components"
import { SendIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"

export function OfferForm({
  pool,
  channelId,
  listingId,
  pubkey,
}: {
  pool: any
  channelId: string
  listingId: string
  pubkey: string
}) {
  // offer
  const [message, setMessage] = useState("")

  const createEvent = async () => {
    // create tags
    const tags = [
      ["e", channelId, "", "root"],
      ["e", listingId, "", "reply"],
      ["p", pubkey, ""],
    ]

    // publish event
    const event = await pool.send({
      content: message,
      tags,
      kind: 42,
    })

    if (event) {
      // reset form
      setMessage("")
      // log, todo: remove
      console.log("published offer to listing:", listingId)
    }
  }

  return (
    <TextField
      placeholder="Send an offer..."
      placeholderTextColor={colors.palette.cyan500}
      style={$input}
      inputWrapperStyle={$inputWrapper}
      onChangeText={setMessage}
      value={message}
      autoCapitalize="none"
      autoFocus={true}
      RightAccessory={() => (
        <Button
          onPress={() => createEvent()}
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
