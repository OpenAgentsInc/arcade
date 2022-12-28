import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import FullScreenGradient from '../components/FullScreenGradient'
import useRelayConnection from '../hooks/useRelayConnection'
import { palette } from '../lib/palette'
import { formatDistanceToNow } from 'date-fns'

const ChatRoomScreen = () => {
  const { messages } = useRelayConnection()
  return (
    <View style={styles.container}>
      <FullScreenGradient colors={[palette.bg, '#2C1837']} start={[0, 0.8]} end={[0, 1]} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          //   backgroundColor: '#1C171D',
        }}>
        {messages
          .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
          .map((message) => (
            <View key={message.id} style={{ marginBottom: 12 }}>
              <View style={{ flex: 1, marginBottom: 2 }}>
                <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'monospace' }}>
                  {message.text}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10, color: '#fff', fontFamily: 'monospace' }}>
                    {truncateString(message.sender, 12)}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 10, color: '#fff', fontFamily: 'monospace' }}>
                    {formatTimestamp(message.timestamp)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  )
}

const formatTimestamp = (timestamp: string) => {
  const timestampNum = parseInt(timestamp)
  const date = new Date(timestampNum * 1000)
  const formattedTimestamp = formatDistanceToNow(date, { addSuffix: true })
  return formattedTimestamp
}

const truncateString = (string: string, maxLength: number) => {
  if (string.length <= maxLength) {
    return string
  }
  return `${string.substring(0, maxLength)}...`
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
    // Android monospace font
    fontFamily: 'monospace',
  },
})

export default ChatRoomScreen
