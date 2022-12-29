import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { color, spacing } from 'views/theme'
import { useRoute } from '@react-navigation/native'
import { MessagePreview } from './message/message'

interface Message {
  id: string
  pubkey: string
}

export const MessageList = observer(() => {
  const { relay, user } = useStores()
  const route = useRoute<any>()
  const channelId = route?.params?.id
  const messages = relay.getMessagesForChannel(channelId)

  useEffect(() => {
    relay.fetchMessages(channelId, messages.length < 4)
    relay.checkAllUserMetadata(channelId)
  }, [channelId])

  const renderItem = ({ item }: { item: Message }) => (
    <MessagePreview message={item} preset={user.publicKey === item.pubkey ? 'sent' : 'received'} />
  )

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={[...messages].reverse()}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  )
})

const keyExtractor = (item: Message) => item.id

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    backgroundColor: color.background,
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  flatList: { flex: 1 },
})
