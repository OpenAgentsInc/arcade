import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { ChatMessage } from '../../../components/store'
import { formatTimestamp } from '../../../lib/utils'

type Props = {
  message: ChatMessage
}

export const Message: React.FC<Props> = ({ message }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
      <Image
        style={{ width: 30, height: 30, borderRadius: 25, alignSelf: 'flex-end' }}
        source={{ uri: 'https://placekitten.com/200/200' }}
      />
      <View
        style={{
          marginLeft: 10,
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor: '#222',
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 10,
        }}>
        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 12 }}>{message.sender}</Text>
        <Text style={{ color: '#fff', fontSize: 12 }}>{message.text}</Text>
        <Text style={{ fontSize: 10, color: 'grey', textAlign: 'right' }}>
          {formatTimestamp(message.timestamp)}
        </Text>
      </View>
    </View>
  )
}
