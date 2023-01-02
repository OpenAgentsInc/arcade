import { useStore } from 'app/stores'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { palette, Text } from '@my/ui'

interface ChannelProps {
  channel: Channel
}

export const Channel = ({ channel }: ChannelProps) => {
  const { addMessage } = useStore()

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: channel.metadata.picture }} style={styles.channelPicture} />
        <Text style={styles.channelName}>{channel.metadata.name}</Text>
      </View>
      <Text style={styles.channelAbout}>{channel.metadata.about}</Text>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addMessage({ id: '123', sender: 'me', text: 'Hello', timestamp: '123' })}
        >
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.portGore,
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: spacing[2],
  },
  headerTitle: {
    color: palette.moonRaker,
    fontSize: 24,
    fontWeight: 'bold',
  },
  messages: {
    flex: 1,
  },
  footer: {
    height: 60,
    backgroundColor: palette.portGore,
  },
  input: {
    flex: 1,
    padding: spacing[2],
  },
})
