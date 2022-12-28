import { View, StyleSheet } from 'react-native'
import FullScreenGradient from '../../../components/FullScreenGradient'
import { palette } from '../../../lib/palette'
import { ChannelHeader } from '../components/ChannelHeader'
import { MessageList } from '../components/MessageList'
import { MessageInput } from '../components/MessageInput'

export const DemoChannel = () => {
  return (
    <View style={styles.container}>
      <FullScreenGradient colors={[palette.bg, '#060B26']} />
      <ChannelHeader
        channelName='Nostr'
        channelImageUrl='https://cloudflare-ipfs.com/ipfs/QmTN4Eas9atUULVbEAbUU8cowhtvK7g3t7jfKztY7wc8eP?.png'
      />
      <MessageList />
      <MessageInput />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
  },
})
