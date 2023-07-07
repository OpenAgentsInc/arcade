import { Send } from '@tamagui/lucide-icons'
import { useUser } from 'lib/hooks'
import { useSendMessage } from 'lib/hooks/useSendMessage'
import { useRef, useState } from 'react'
import { Alert, TextInput, TouchableOpacity } from 'react-native'
import { Input, XStack } from 'tamagui'

export const MessageInput = ({ conversationId, conversationType }) => {
  const { mutate } = useSendMessage()
  const [text, setText] = useState('')
  const inputBoxRef = useRef<TextInput | null>(null)
  const { userId } = useUser()
  const submitInput = (enteredText) => {
    if (!userId) {
      Alert.alert("Couldn't find your user ID - try reopening the app")
      return
    }
    if (!enteredText || enteredText.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    setText('')
    inputBoxRef.current?.clear()
    inputBoxRef.current?.blur()

    const textToSend = enteredText ?? text

    // console.log('Sending message:', textToSend)
    if (typeof userId !== 'string') return
    mutate({ message: textToSend, conversationId, conversationType })
  }
  return (
    <XStack alignItems="center" p="$1" my="$1">
      <Input
        color="#fff"
        borderColor="#2A2A2B"
        backgroundColor="transparent"
        size="$6"
        placeholder={
          conversationType === 'dialogue'
            ? `Write your message here`
            : 'Ask your question here'
        }
        placeholderTextColor="$gray9"
        autoCorrect={false}
        onChangeText={(text: string) => setText(text)}
        ref={inputBoxRef}
        spellCheck={false}
        fg={1}
        fs={1}
      />

      <TouchableOpacity activeOpacity={0.8} onPress={() => submitInput(text)}>
        <Send color="#43A081" size={34} style={{ marginLeft: 13 }} />
      </TouchableOpacity>
    </XStack>
  )
}
