import { usePlan } from 'lib/hooks/usePlan'
import FastImage from 'react-native-fast-image'
import { Paragraph, XStack } from 'tamagui'
import { images } from 'views/shared'

import { MessageType } from './Message'

export const MessageSimple = ({ message }: { message: MessageType }) => {
  const img = message.from === 'user' ? images.face : images.faerie
  const plan = usePlan()
  return (
    <XStack key={message.timestamp} backgroundColor="transparent" pt="$2">
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
      <Paragraph pl="$4" pr="$5" fontSize={16} numberOfLines={plan ? 8 : 5}>
        {message.message}
      </Paragraph>
    </XStack>
  )
}
