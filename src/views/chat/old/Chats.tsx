import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ChatsHeader } from './ChatsHeader'
import { FullScreenGradient } from 'views/shared'
import { chats } from 'lib/dummydata'
import { ACTIVE_OPACITY, palette } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export const ChatsScreen = () => {
  const navigation = useNavigation()
  const navtoit = () => {
    // Navigate to the channel screen
    navigation.navigate('channel', { id: 'whatever', name: 'whatever' })
  }
  return (
    <>
      <FullScreenGradient colors={[palette.bg, '#060B26']} start={[0, 0.7]} />
      <ChatsHeader />
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatContainer}
            onPress={navtoit}
            activeOpacity={ACTIVE_OPACITY}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              {/* If item.message contains the word sats, make this italic */}
              {item.message.includes('sats') ? (
                <Text style={[styles.messageText, { fontStyle: 'italic' }]}>{item.message}</Text>
              ) : (
                <Text style={styles.messageText}>{item.message}</Text>
              )}
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{item.time}</Text>
              {item.unreadCount > 0 && (
                <View style={styles.unreadCount}>
                  <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.container}
      />
    </>
  )
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

export default ChatsScreen
