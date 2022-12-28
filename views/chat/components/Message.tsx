import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { ChatMessage } from '../../../components/store'
import { formatTimestamp, truncateString } from '../../../lib/utils'
import { LinearGradient } from 'expo-linear-gradient'
import { palette } from '../../../lib/palette'

type Props = {
  message: ChatMessage
}

export const Message: React.FC<Props> = ({ message }) => {
  const currentUser = 'Bob'
  const align = message.sender === currentUser ? 'flex-end' : 'flex-start'
  const isCurrentUser = message.sender === currentUser
  const pic = isCurrentUser ? 'https://i.pravatar.cc/100' : 'https://placekitten.com/200/200' //  'https://i.pravatar.cc/150?img=5'
  const gradientColors = isCurrentUser
    ? ['#7454FF', palette.indigo]
    : [palette.night, palette.night]
  const metadataColor = isCurrentUser ? palette.blueBell : palette.blueBellFaded
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 12 }}>
      {isCurrentUser ? (
        <View style={{ flexGrow: 1, flexShrink: 1 }} />
      ) : (
        <Image
          style={{ width: 30, height: 30, borderRadius: 25, alignSelf: 'flex-end' }}
          source={{ uri: pic }}
        />
      )}
      <LinearGradient
        colors={gradientColors}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
        style={{
          marginHorizontal: 8,
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor: '#222',
          paddingHorizontal: 7,
          paddingVertical: 3,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: isCurrentUser ? 0 : 10,
          borderBottomLeftRadius: isCurrentUser ? 10 : 0,
          alignSelf: align,
        }}>
        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 12 }}>
          {truncateString(message.sender, 10)}
        </Text>
        <Text style={{ color: palette.moonRaker, fontSize: 12 }}>{message.text}</Text>
        <Text style={{ fontSize: 10, color: metadataColor, textAlign: 'right' }}>
          {formatTimestamp(message.timestamp)}
        </Text>
      </LinearGradient>
      {isCurrentUser ? (
        <Image
          style={{ width: 30, height: 30, borderRadius: 25, alignSelf: align }}
          source={{ uri: pic }}
        />
      ) : (
        <></>
      )}
    </View>
  )
}
