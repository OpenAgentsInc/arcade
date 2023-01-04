import { formatTimestamp, truncateString } from 'app/lib/utils'
import { useStore } from 'app/stores'
import { ChatMessage } from 'app/stores/chat'
import { Image, Text, View } from 'react-native'
import { palette, YStack } from '@my/ui'

const typography = {
  bold: 'bold',
  primary: 'System',
}

type Props = {
  message: ChatMessage
}

export const Message: React.FC<Props> = ({ message }) => {
  const currentUser = useStore((state) => state.user.publicKey)
  const align = message.sender === currentUser ? 'flex-end' : 'flex-start'
  const isCurrentUser = message.sender === currentUser
  const pic = isCurrentUser ? 'https://i.pravatar.cc/100' : 'https://placekitten.com/200/200'
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
      <YStack
        flexGrow={1}
        flexShrink={1}
        bg={isCurrentUser ? '$backgroundStrong' : '$background'}
        style={{
          marginHorizontal: 8,
          paddingHorizontal: 7,
          paddingVertical: 3,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: isCurrentUser ? 0 : 10,
          borderBottomLeftRadius: isCurrentUser ? 10 : 0,
          alignSelf: align,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 12,
            fontFamily: typography.primary,
          }}
        >
          {truncateString(message.sender, 10)}
        </Text>
        <Text style={{ color: palette.moonRaker, fontSize: 12, fontFamily: typography.primary }}>
          {message.text}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: metadataColor,
            textAlign: 'right',
            fontFamily: typography.primary,
          }}
        >
          {formatTimestamp(message.timestamp)}
        </Text>
      </YStack>
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
