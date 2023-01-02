import { Channel as ChannelType, useChat } from 'app/stores/chat'
import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { palette, spacing } from '@my/ui'
import { ChatContext } from './context'

interface ChannelProps {
  channel: ChannelType
  onPress: () => void
}

export const Channel = ({ channel, onPress }: ChannelProps) => {
  const { setCurrentChannel } = useContext(ChatContext)
  const { messages } = useChat(channel)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: channel.metadata.picture }}
          style={styles.headerImage}
          onError={() => setImg(generateRandomPlacekitten())}
        />
        <Text style={styles.headerTitle}>{channel.metadata.name}</Text>
      </View>
      <View style={styles.messages}>
        {messages.map((message) => (
          <Text key={message.id}>{message.text}</Text>
        ))}
      </View>
      <View style={styles.footer}>
        <TextInput style={styles.input} />
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
