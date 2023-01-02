import { formatTimestamp, isValidImageUrl } from 'app/lib/utils'
import { Channel } from 'app/stores/chat'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, ListItem, Stack } from '@my/ui'

interface ChannelPreviewProps {
  channel: Channel
  onPress: () => void
}

export const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel, onPress }) => {
  const [img, setImg] = useState(
    isValidImageUrl(channel.metadata.picture)
      ? channel.metadata.picture
      : 'https://placekitten.com/100/100'
  )
  const item = { ...channel, unreadCount: 4 }
  return (
    <TouchableOpacity style={styles.chatContainer} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: img }}
        style={styles.avatar}
        onError={() => setImg('https://placekitten.com/101/101')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.metadata.name}</Text>

        <Text style={styles.messageText}>{item.metadata.about}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTimestamp(item.timestamp)}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadCount}>
            <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  //   return (
  //     <ListItem
  //       hoverTheme
  //       pressTheme
  //       title={channel.metadata.name}
  //       subTitle={channel.metadata.about}
  //       onPress={onPress}
  //       icon={
  //         <Image
  //           source={{ uri: img }}
  //           style={styles.avatar}
  //           onError={() => setImg('https://placekitten.com/101/101')}
  //         />
  //       }
  //       // iconAfter={ChevronRight}
  //     />
  //   )

  //   return <Button onPress={onPress} />
  //   const imageUri = isValidImageUrl(channel.metadata.picture)
  //     ? channel.metadata.picture
  //     : 'https://placekitten.com/100/100'
  //   return (
  //     <TouchableOpacity style={styles.channelContainer} onPress={onPress} activeOpacity={0.8}>
  //       {/* {channel.metadata.picture ? (
  //         <Image source={{ uri: imageUri }} style={styles.avatar} />
  //       ) : (
  //         <View style={styles.defaultAvatar}>
  //           <Text style={styles.defaultAvatarText}>{channel.metadata.name[0]}</Text>
  //         </View>
  //       )} */}
  //       {/* <Stack style={styles.textContainer}>
  //         <Text style={styles.nameText}>{channel.metadata.name}</Text>
  //         <Text style={styles.aboutText}>{channel.metadata.about}</Text>
  //       </Stack> */}
  //       {/* <View style={styles.timeContainer}>
  //         <Text style={styles.timeText}>
  //           {new Date(parseInt(channel.timestamp) * 1000).toDateString()}
  //         </Text>
  //       </View> */}
  //     </TouchableOpacity>
  //   )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#1E2340',
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
    fontSize: 16,
    color: '#F6F9FA',
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
    color: '#8392A8',
  },
  timeContainer: {
    alignItems: 'center',
    marginLeft: 'auto',
  },
  unreadCount: {
    width: 20,
    height: 20,
    backgroundColor: '#364962',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginLeft: 10,
  },
  unreadCountText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#3B4557',
  },
})
