import { View } from 'react-native'
import FullScreenGradient from '../../../components/FullScreenGradient'
import { palette } from '../../../lib/palette'
import { ChannelHeader } from '../components/ChannelHeader'

export const DemoChannel = () => {
  return (
    <View style={{ flex: 1, paddingTop: 55, paddingHorizontal: 10 }}>
      <FullScreenGradient colors={[palette.bg, '#060B26']} />
      <ChannelHeader
        channelName='Nostr'
        channelImageUrl='https://cloudflare-ipfs.com/ipfs/QmTN4Eas9atUULVbEAbUU8cowhtvK7g3t7jfKztY7wc8eP?.png'
      />
    </View>
  )
}
