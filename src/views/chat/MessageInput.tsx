import { useContext, useRef, useState } from 'react'
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { color, palette } from 'views/theme'
import { FontAwesome } from '@expo/vector-icons'

interface MessageInputProps {
  channelId: string
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
  const [text, setText] = useState('')
  const { relay } = useStores()
  const inputBoxRef = useRef<TextInput | null>(null)
  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    if (!channelId) {
      Alert.alert('Error getting channel ID')
      return
    }
    inputBoxRef.current?.clear()
    setText('')
    relay.sendChannelMessage(channelId, text)
  }
  return (
    <View style={styles.container}>
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCorrect={false}
            multiline
            onChangeText={(text: string) => setText(text)}
            ref={inputBoxRef}
            spellCheck={false}
            style={styles.inputBox}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={submitInput}
            style={styles.sendButtonContainer}>
            <FontAwesome name='send' size={24} color={palette.blueBell} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  composerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    backgroundColor: palette.purple,
    borderTopWidth: 1,
    borderTopColor: palette.portGore,
    padding: 10,
    height: 60,
  },
  inputBox: {
    backgroundColor: color.field,
    color: color.text,
    flexGrow: 1,
    fontSize: 14,
    height: 40,
    borderRadius: 10,
    includeFontPadding: false,
    padding: 10,
    textAlignVertical: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    maxWidth: '100%',
  },
  sendButtonContainer: {
    marginLeft: 14,
  },
})
