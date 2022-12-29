import { generateRandomPlacekitten } from 'lib/placekitten'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { color, palette, spacing, typography } from '../theme'

interface Channel {
  about: string
  id: string
  name: string
  picture: string
}

interface ChannelPreviewProps {
  channel: Channel
}

export const ChannelPreview = ({ channel }: ChannelPreviewProps) => {
  const navigation = useNavigation()
  const picture =
    channel?.picture && channel?.picture?.length > 4 ? channel.picture : generateRandomPlacekitten()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={channel?.id ?? 'asdf'}
      onPress={() => navigation.navigate('channel', { id: channel.id, name: channel.name })}
      style={styles.container}>
      <Image
        source={{ uri: picture }}
        style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.channelName}>{channel?.name ?? 'no name'}</Text>
        <Text style={styles.channelPreview}>{channel?.about ?? 'no about'}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  channelName: {
    color: palette.moonRaker,
    // fontFamily: typography.secondary,
    fontWeight: '700',
    textAlign: 'left',
    paddingHorizontal: spacing[2],
    paddingTop: 1,
  },
  channelPreview: {
    color: palette.blueBell,
    textAlign: 'left',
    // fontFamily: typography.primary,
    fontSize: 12,
    paddingHorizontal: spacing[2],
    paddingTop: 4,
  },
  container: {
    backgroundColor: palette.purple,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    flexDirection: 'row',
    padding: spacing[3],
  },
  contentContainer: { flex: 1 },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: { fontSize: 14, fontWeight: '700' },
})
