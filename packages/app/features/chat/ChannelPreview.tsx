import { isValidImageUrl } from 'app/lib/utils'
import { Channel } from 'app/stores/chat'
import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ChannelPreviewProps {
  channel: Channel
  onPress: () => void
}

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel, onPress }) => {
  const imageUri = isValidImageUrl(channel.metadata.picture)
    ? channel.metadata.picture
    : 'https://placekitten.com/100/100'
  return (
    <TouchableOpacity style={styles.channelContainer} onPress={onPress} activeOpacity={0.8}>
      {channel.metadata.picture ? (
        <Image source={{ uri: imageUri }} style={styles.avatar} />
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
        <Text style={styles.timeText}>
          {new Date(parseInt(channel.timestamp) * 1000).toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultAvatarText: {
    color: '#fff',
    fontSize: 20,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
})
