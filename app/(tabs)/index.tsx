import { StyleSheet } from 'react-native'
import { StreamChat } from 'stream-chat'
import {
  ChannelList,
  ChannelListMessenger,
  Chat,
  OverlayProvider,
} from 'stream-chat-expo'
import { View } from '../../components/Themed'
import { chatApiKey } from '../../lib/chatConfig'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ChannelList
        List={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <ChannelListMessenger />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
