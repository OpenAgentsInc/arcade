import { ListRenderItemInfo } from '@shopify/flash-list'
import FastImage from 'react-native-fast-image'
import { Paragraph, XStack, YStack } from 'tamagui'
import { AnimatedTyping, images } from 'views/shared'

import { CopyButton } from './CopyButton'

export type MessageType = {
  conversationId: string
  from: 'user' | 'faerie'
  message: string
  timestamp: string
  userId: string
}

export const Message = ({ item, index }: ListRenderItemInfo<MessageType>) => {
  const fromUser = !item.from || item.from === 'user'
  const backgroundColor = fromUser ? 'transparent' : '#1C1C1D'
  const img = fromUser ? images.face : images.faerie
  const loading = item.message === 'LOADING'

  // If this message is more than 30 seconds old...
  const timestamp = new Date(item.timestamp)
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const seconds = diff / 1000

  const MessageComponent =
    fromUser || seconds > 10
      ? () => (
          <Paragraph pl="$3" pr="$5" fontSize={16} color="#fff">
            {item.message}
          </Paragraph>
        )
      : () => (
          <XStack w="100%" f={1}>
            <AnimatedTyping text={item.message} />
          </XStack>
        )

  return (
    <XStack
      key={index}
      backgroundColor={loading ? '#000' : backgroundColor}
      py="$4"
      pl="$3"
      pr="$5"
    >
      <FastImage
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#000',
        }}
        source={img}
        resizeMode={FastImage.resizeMode.contain}
      />
      <YStack>
        {loading ? (
          <XStack w="100%" py="$2" px="$4">
            <FastImage
              style={{
                width: 54,
                height: 38,
                marginTop: -16,
              }}
              source={images.typing}
              resizeMode={FastImage.resizeMode.contain}
            />
          </XStack>
        ) : (
          <XStack w="100%">
            <MessageComponent />
          </XStack>
        )}

        {!fromUser && !loading && <CopyButton message={item.message} />}
      </YStack>
    </XStack>
  )
}
