import { Copy } from "lucide-react-native"
import * as Clipboard from "expo-clipboard"
import { Alert, View } from "react-native"
import { Button } from "../Button"
import { $sendButton } from "./MessageInput"

export const CopyButton = ({ message }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(message)
    Alert.alert("Copied to clipboard! 📋")
  }
  return (
    <View style={{ width: "100%", justifyContent: "flex-end", marginBottom: 4, paddingRight: 20 }}>
      <Button
        LeftAccessory={() => <Copy width={30} height={30} style={{ color: "#8E8E92" }} />}
        style={$sendButton}
        onPress={copyToClipboard}
      />
    </View>
  )
}
