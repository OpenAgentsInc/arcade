import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { formatTimestamp, truncateString } from '../lib/utils'
import { ChatMessage } from './store'

const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-end',
    // flexDirection: 'row',
  },
})

interface MessageProps {
  message: ChatMessage
  alignment: 'left' | 'right'
}

const Message = (props: MessageProps) => {
  const { message, alignment = 'left' } = props
  return (
    <View
      style={
        [
          // styles.container,
          // { justifyContent: alignment === 'left' ? 'flex-start' : 'flex-end' },
        ]
      }>
      <View style={{ marginBottom: 12 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'flex-end',
            // alignItems: 'flex-end',
            padding: 8,
            width: 272,
            borderWidth: 1,
            borderColor: '#1C1E22',
            // height: 50,
            backgroundColor: '#1C1E22',
            borderRadius: 16,
          }}>
          <Text style={{ fontSize: 14, color: '#fff' }}>{message.text}</Text>
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
    </View>
  )
}

export default Message
