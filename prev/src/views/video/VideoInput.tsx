import { CloudLightning, Send, Zap } from '@tamagui/lucide-icons'
import { useRef, useState } from 'react'
import { Alert, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input, XStack } from 'tamagui'

export const VideoInput = () => {
  const [text, setText] = useState('')
  const inputBoxRef = useRef<TextInput | null>(null)
  //   const actions = useStore((state) => state.chatActions)

  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    inputBoxRef.current?.clear()
    inputBoxRef.current?.blur()
    setText('')
    setTimeout(() => {
      console.log('sendMessage goes here')
      //   sendMessage(text, channelId)
    }, 100)
  }

  return (
    <XStack alignItems="center" p="$2" pb="$3">
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
        <Zap color="$color10" size={24} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </XStack>
  )
}