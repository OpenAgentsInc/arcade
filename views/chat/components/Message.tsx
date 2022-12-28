import * as React from 'react'
import { View, Text } from 'react-native'
import { ChatMessage } from '../../../components/store'

type Props = {
  message: ChatMessage
}

export const Message: React.FC<Props> = ({ message }) => {
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontWeight: 'bold', color: '#fff' }}>{message.sender}:</Text>
      <Text style={{ color: '#fff' }}>{message.text}</Text>
      <Text style={{ fontSize: 10, color: 'grey' }}>{message.timestamp}</Text>
    </View>
  )
}
