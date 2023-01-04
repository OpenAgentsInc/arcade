import { useStore } from 'app/stores'
import { useRef, useState } from 'react'
import { Alert, TextInput, TouchableOpacity } from 'react-native'
import { Input, XStack } from '@my/ui'
import { Send } from '@tamagui/lucide-icons'

export const MessageInput = ({ channelId }) => {
  const [text, setText] = useState('')
  const inputBoxRef = useRef<TextInput | null>(null)
  const actions = useStore((state) => state.chatActions)

  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    inputBoxRef.current?.clear()
    inputBoxRef.current?.blur()
    setText('')
    setTimeout(() => {
      actions.sendMessage(text, channelId)
    }, 100)
  }

  return (
    <XStack alignItems="center" px="$2">
      <Input
        color="$color12"
        placeholder="Message"
        placeholderTextColor="$color8"
        autoCorrect={false}
        onChangeText={(text: string) => setText(text)}
        ref={inputBoxRef}
        spellCheck={false}
        fg={1}
        fs={1}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={submitInput}>
        <Send color="$color10" size={24} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </XStack>
  )
}
