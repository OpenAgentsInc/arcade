import { useRef, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { palette } from '../../../lib/palette'

export const MessageInput = () => {
  const [text, setText] = useState('')
  // @ts-ignore
  const inputBoxRef = useRef<TextInput | null>(null)
  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    // if (!channelId) {
    //   Alert.alert('Error getting channel ID')
    //   return
    // }
    inputBoxRef.current?.clear()

    // And clear the focus on the input box
    inputBoxRef.current?.blur()

    console.log("Pretended to send: '" + text + "'")
    setText('')
    // relay.sendChannelMessage(channelId, text)
  }
  return (
    <View style={{ backgroundColor: palette.night, borderTopWidth: 1, padding: 6 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <TextInput
          textColor={palette.moonRaker}
          placeholder='Message'
          placeholderTextColor={palette.blueBellFaded}
          autoCorrect={false}
          onChangeText={(text: string) => setText(text)}
          ref={inputBoxRef}
          spellCheck={false}
          style={{
            backgroundColor: palette.night,
            color: palette.moonRaker,
            flexGrow: 1,
            flexShrink: 1,
            fontSize: 14,
            height: 40,
            borderRadius: 10,
            includeFontPadding: false,
            paddingHorizontal: 10,
            textAlignVertical: 'center',
          }}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={submitInput}>
          <IconButton
            icon='send'
            iconColor={palette.blueBell}
            style={{ marginLeft: 10 }}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
