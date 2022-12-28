import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export const MessageInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <TextInput />
        </View>
        <View style={styles.sendButtonContainer}>
          <Button>Test</Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  composerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    borderTopWidth: 1,
    padding: 10,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
  },
  sendButtonContainer: { paddingBottom: 10, paddingLeft: 10 },
})
