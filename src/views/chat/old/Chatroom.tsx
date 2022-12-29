import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { FullScreenGradient } from 'views/shared'
import useRelayConnection from 'lib/hooks/useRelayConnection'
import { palette } from 'views/theme'
import Message from './Message'

const ChatRoomScreen = () => {
  const { messages } = useRelayConnection()
  return (
    <View style={styles.container}>
      <FullScreenGradient colors={[palette.bg, '#2C1837']} start={[0, 0.8]} end={[0, 1]} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {messages
          .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
          .map((message) => (
            <Message key={message.id} message={message} alignment='left' />
          ))}
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
    backgroundColor: palette.bg,
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
    backgroundColor: '#1C171D',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
  },
})

export default ChatRoomScreen
