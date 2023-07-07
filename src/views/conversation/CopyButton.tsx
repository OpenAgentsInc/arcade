import { Copy } from '@tamagui/lucide-icons'
import * as Clipboard from 'expo-clipboard'
import { Alert } from 'react-native'
import { Button, XStack } from 'tamagui'

export const CopyButton = ({ message }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(message)
    Alert.alert('Copied to clipboard! 📋')
  }
  return (
    <XStack w="100%" jc="flex-end" mb="$1" pr="$7">
      <Button
        circular
        icon={<Copy color="#8E8E92" size={30} />}
        onPress={copyToClipboard}
        backgroundColor="transparent"
        pressStyle={{ opacity: 0.8 }}
        p="$3"
      />
    </XStack>
  )
}
