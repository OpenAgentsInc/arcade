import { observer } from 'mobx-react-lite'
import { FlatList, StyleSheet } from 'react-native'
import { useStores } from 'stores/root-store'
import { ChannelPreview } from './ChannelPreview'

interface Channel {
  about: string
  id: string
  name: string
  picture: string
  pubkey: string
}

export const ChatHome = observer(() => {
  const { relay } = useStores()
  const channels = relay.channels as Channel[]
  return (
    <FlatList
      data={channels}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={[styles.flatList]}
    />
  )
})

const keyExtractor = (item: Channel) => item.id

const renderItem = ({ item }: { item: Channel }) => <ChannelPreview channel={item} />

const styles = StyleSheet.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: 'absolute', right: 0, top: 0 },
})
