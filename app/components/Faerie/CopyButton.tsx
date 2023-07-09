import { Copy } from "lucide-react-native"
import * as Clipboard from "expo-clipboard"
import { Alert, View, StyleSheet } from "react-native"
import { Button } from "../Button"
import { $sendButton } from "./MessageInput"
import React from "react"

export const CopyButton = ({ message }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(message)
    Alert.alert("Copied to clipboard! 📋")
  }

  return (
    <View style={styles.container}>
      <Button
        LeftAccessory={() => <Copy width={30} height={30} style={styles.copyIcon} />}
        style={$sendButton}
        onPress={copyToClipboard}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    marginBottom: 4,
    paddingRight: 20,
    width: "100%",
  },
  // eslint-disable-next-line react-native/no-color-literals
  copyIcon: {
    color: "#8E8E92",
  },
})
