import { Channel } from 'app/stores/chat'
import { useRef } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '@my/ui'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { useChannels } from './useChannels'

function isValidImageUrl(url: string): boolean {
  // TODO: this needs work
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  if (urlRegex.test(url)) {
    console.log('VALID:', url)
    return true
  } else {
    console.log('INVALID:', url)
    return false
  }
}

export const ChannelList = () => {
  const channels = useChannels()
  const flashListRef = useRef<FlashList<Channel>>(null)

  const renderItem = ({ index }: ListRenderItemInfo<Channel>) => {
    const channel = channels[index]
    if (!channel) return <></>
    const imageUri = isValidImageUrl(channel.metadata.picture)
      ? channel.metadata.picture
      : 'https://placekitten.com/100/100'
    return (
      <View style={styles.container}>
        <Text color="$moonRaker">{channel.metadata.name}</Text>
        <Text color="$moonRaker">{channel.metadata.about}</Text>

        <Image source={{ uri: imageUri }} style={styles.avatar} />
      </View>
    )
  }

  return (
    <FlashList
      ref={flashListRef}
      renderItem={renderItem}
      estimatedItemSize={150}
      data={channels}
      ListHeaderComponent={<Text>Channels</Text>}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  about: {
    fontSize: 14,
    color: '#666',
  },
})
