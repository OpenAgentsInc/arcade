import { generateRandomPlacekitten, isValidImageUrl } from 'app/lib/utils'
import { Channel } from 'app/stores/chat'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useLink } from 'solito/link'
import { Button, palette, Paragraph, Text } from '@my/ui'

interface ChannelPreviewProps {
  channel: Channel
  onPress: () => void
}

export const ChannelPreview = ({ channel, onPress }: ChannelPreviewProps) => {
  const [img, setImg] = useState(
    channel?.metadata.picture &&
      channel?.metadata.picture?.length > 4 &&
      isValidImageUrl(channel.metadata.picture)
      ? channel.metadata.picture
      : generateRandomPlacekitten()
  )

  const linkProps = useLink({
    href: `/channel/${channel?.id ?? 'asdf'}`,
  })

  return (
    <Button
      key={channel?.id ?? 'asdf'}
      bg="$color2"
      borderRadius={0}
      borderWidth={0}
      {...linkProps}
    >
      <Image
        source={{ uri: img }}
        style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
        onError={() => setImg(generateRandomPlacekitten())}
      />
      <View style={styles.contentContainer}>
        <Paragraph col="$color12" px="$2" mt={10} mb={0}>
          {channel?.metadata.name ?? 'no name'}
        </Paragraph>
        <Paragraph px="$2" py={0} mb={5} mt={-5} col="$color9">
          {channel?.metadata.about ?? 'no about'}
        </Paragraph>
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  channelName: {
    color: palette.moonRaker,
    textAlign: 'left',
    paddingTop: 1,
  },
  channelPreview: {
    color: palette.blueBell,
    textAlign: 'left',
    // fontFamily: typography.primary,
    fontSize: 12,
    // paddingHorizontal: spacing[2],
    paddingTop: 4,
  },
  container: {
    backgroundColor: palette.purple,
    borderBottomWidth: 1,
    borderColor: palette.portGore,
    borderBottomColor: palette.portGore,
    flexDirection: 'row',
    padding: 12,
  },
  contentContainer: { flex: 1 },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: { fontSize: 14, fontWeight: '700' },
})
