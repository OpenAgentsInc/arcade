import { sendChannelMessage } from 'app/lib/chat'
import { useStore } from 'app/stores'
// import { palette, } from 'app/theme'
import { useRef, useState } from 'react'
import { Alert, TextInput, View } from 'react-native'
import { palette } from '@my/ui'

export const MessageInput = () => {
  const relay = useStore((state) => state.relay)
  const [text, setText] = useState('')
  const inputBoxRef = useRef<TextInput | null>(null)

  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    inputBoxRef.current?.clear()
    inputBoxRef.current?.blur()
    setText('')
    setTimeout(() => {
      sendChannelMessage(text, relay)
    }, 100)
  }

  return (
    <View style={{ backgroundColor: palette.night, borderTopWidth: 1, padding: 6 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <TextInput
          placeholder="Message"
          placeholderTextColor={palette.blueBellFaded}
          autoCorrect={false}
          onChangeText={(text: string) => setText(text)}
          multiline={true}
          ref={inputBoxRef}
          spellCheck={false}
          style={{
            backgroundColor: palette.night,
            color: palette.moonRaker,
            // fontFamily: typography.primary,
            flexGrow: 1,
            flexShrink: 1,
            fontSize: 14,
            minHeight: 40,
            borderRadius: 10,
            includeFontPadding: false,
            paddingHorizontal: 10,
            textAlignVertical: 'center',
          }}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={submitInput}>
          <IconButton
            icon="send"
            iconColor={palette.blueBell}
            style={{ marginLeft: 10 }}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
