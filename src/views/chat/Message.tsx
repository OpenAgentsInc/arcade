import { formatTimestamp, truncateString } from 'lib/utils'
import { Image, View } from 'react-native'
import { useStore } from 'stores'
import { ChatMessage } from 'stores/chat'
import { Paragraph, XStack, YStack } from 'tamagui'
import { useUserMetadata } from './useUserMetadata'

type Props = {
  message: ChatMessage
}

export const Message: React.FC<Props> = ({ message }) => {
  const currentUser = useStore((state) => state.user.publicKey)
  const userMetadata = useUserMetadata(message.sender)
  const align = message.sender === currentUser ? 'flex-end' : 'flex-start'
  const isCurrentUser = message.sender === currentUser
  const pic = isCurrentUser
    ? 'https://placekitten.com/201/201'
    : 'https://placekitten.com/200/200'
  return (
    <XStack flex={1} mt={12}>
      {isCurrentUser ? (
        <View style={{ flexGrow: 1, flexShrink: 1 }} />
      ) : (
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            alignSelf: 'flex-end',
          }}
          source={{ uri: userMetadata?.picture ?? pic }}
        />
      )}
      <YStack
        elevation={'$2'}
        flexGrow={1}
        flexShrink={1}
        bg={isCurrentUser ? '$backgroundStrong' : '$color4'}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        borderBottomRightRadius={isCurrentUser ? 0 : 10}
        borderBottomLeftRadius={isCurrentUser ? 10 : 0}
        paddingVertical={3}
        paddingHorizontal={7}
        marginHorizontal={8}
        alignSelf={align}
      >
        <Paragraph
          color="$color11"
          lineHeight={14}
          fontWeight="700"
          fontSize="$2"
          fontFamily="$body"
        >
          {userMetadata?.name ?? truncateString(message.sender, 10)}
        </Paragraph>
        <Paragraph
          mt={2}
          color="$color12"
          fontSize="$2"
          lineHeight={16}
          fontFamily="$body"
        >
          {message.text}
        </Paragraph>
        <Paragraph
          mt={1}
          color="$color8"
          lineHeight={14}
          fontSize={10}
          textAlign="right"
          fontFamily="$body"
        >
          {formatTimestamp(message.timestamp)}
        </Paragraph>
      </YStack>
      {isCurrentUser ? (
        <Image
          style={{ width: 30, height: 30, borderRadius: 25, alignSelf: align }}
          source={{ uri: userMetadata?.picture ?? pic }}
        />
      ) : (
        <></>
      )}
    </XStack>
  )
}
