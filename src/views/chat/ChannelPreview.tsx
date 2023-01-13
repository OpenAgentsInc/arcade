import { generateRandomPlacekitten, isValidImageUrl } from 'app/lib/utils'
import { Channel } from 'app/stores/eventTypes'
import { useState } from 'react'
import { Image, View } from 'react-native'
import { Button, Paragraph } from 'tamagui'

interface ChannelPreviewProps {
  channel: Channel
  onPress: () => void
}

export const ChannelPreview = ({ channel, onPress }: ChannelPreviewProps) => {
  const [img, setImg] = useState(
    channel?.picture &&
      channel?.picture?.length > 4 &&
      isValidImageUrl(channel.picture)
      ? channel.picture
      : generateRandomPlacekitten()
  )

  return (
    <Button
      onPress={onPress}
      key={channel?.id ?? 'asdf'}
      bg="$color2"
      borderRadius={0}
      borderWidth={0}
    >
      <Image
        source={{ uri: img }}
        style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
        onError={() => setImg(generateRandomPlacekitten())}
      />
      <View style={{ flex: 1 }}>
        <Paragraph
          col="$color12"
          px="$2"
          mt={channel?.about ? 5 : -5}
          numberOfLines={1}
        >
          {channel?.name ?? 'no name'}
        </Paragraph>
        <Paragraph
          px="$2"
          py={0}
          mb={5}
          mt={-10}
          col="$color9"
          fontSize="$1"
          numberOfLines={1}
        >
          {channel?.about ?? 'no about'}
        </Paragraph>
      </View>
    </Button>
  )
}
