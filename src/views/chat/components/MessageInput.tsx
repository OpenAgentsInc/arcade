import { Send } from '@tamagui/lucide-icons'
import { useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input, XStack } from 'tamagui'

import { sendMessage } from '../actions/sendMessage'

export const MessageInput = ({ channel }) => {
  const [text, setText] = useState('')
  const inputBoxRef = useRef<TextInput>(null)
  const submitInput = () => {
    if (!inputBoxRef) return
    sendMessage(channel, text, setText, inputBoxRef)
  }
  return (
    <XStack alignItems="center" p="$2">
      <KeyboardAwareScrollView style={{ flexGrow: 1, flexShrink: 1 }}>
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
      </KeyboardAwareScrollView>
      <TouchableOpacity activeOpacity={0.8} onPress={submitInput}>
        <Send color="$color10" size={24} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </XStack>
  )
}
