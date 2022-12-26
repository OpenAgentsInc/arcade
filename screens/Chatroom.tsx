import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { GradientButton } from '../components/GradientButton'
import { palette } from '../lib/palette'

const ChatRoomScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        <View style={styles.message}>
          <Text style={styles.messageText}>Hey, how's it going?</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.messageText}>I'm doing well, thanks for asking.</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.messageText}>What have you been up to lately?</Text>
        </View>

        <GradientButton />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0C2E',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#0B0C2E',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
    // Android monospace font
    fontFamily: 'monospace',
  },
})

export default ChatRoomScreen
