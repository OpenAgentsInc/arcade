import { Channel } from 'app/stores/chat'
import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ChannelPreviewProps {
  channel: Channel
  onPress: () => void
}

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel, onPress }) => {
  return (
    <TouchableOpacity style={styles.channelContainer} onPress={onPress} activeOpacity={0.8}>
      {channel.metadata.picture ? (
        <Image source={{ uri: channel.metadata.picture }} style={styles.avatar} />
      ) : (
        <View style={styles.defaultAvatar}>
          <Text style={styles.defaultAvatarText}>{channel.metadata.name[0]}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{channel.metadata.name}</Text>
        <Text style={styles.aboutText}>{channel.metadata.about}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{new Date(channel.created_at * 1000).toDateString()}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    color: '#999',
    fontSize: 14,
  },
  timeContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  timeText: {
    color: '#999',
    fontSize: 12,
  },
  unreadCount: {
    backgroundColor: '#6646ee',
    padding: 4,
    borderRadius: 10,
  },
  unreadCountText: {
    color: 'white',
    fontSize: 12,
  },
})
