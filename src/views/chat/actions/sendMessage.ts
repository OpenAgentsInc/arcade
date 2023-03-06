import { RefObject } from 'react'
import { Alert, TextInput } from 'react-native'

export const sendMessage = (
  channelId: string,
  text: string,
  setText: (text: string) => void,
  inputBoxRef: RefObject<TextInput>
) => {
  console.log('Sending a message to channel:', channelId)
  if (text.length < 1) {
    Alert.alert('Message too short', 'What is that, a message for ants?')
    return
  }
  inputBoxRef.current?.clear()
  inputBoxRef.current?.blur()
  setText('')
  setTimeout(() => {
    console.log('sendMessage goes here...')
    //   sendMessage(text, channelId)
  }, 100)
}
