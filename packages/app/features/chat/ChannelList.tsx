import { Channel } from 'app/stores/chat'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { useChannels } from './useChannels'

export const ChannelList = () => {
  const channels = useChannels()
  const flashListRef = useRef<FlashList<Channel>>(null)

  const renderItem = ({ index }: ListRenderItemInfo<Channel>) => {
    const channel = channels[index]
    if (!channel) return <></>
    return (
      <View style={styles.container}>
        <Text>{channel.metadata.name}</Text>
        <Text>{channel.metadata.about}</Text>
        <Text>{channel.metadata.picture}</Text>
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
