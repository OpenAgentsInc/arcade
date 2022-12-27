import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ChatsHeader } from '../components/ChatsHeader'
import FullScreenGradient from '../components/FullScreenGradient'
import { palette } from '../lib/palette'

export const ChatsScreen = () => {
  return (
    <>
      <FullScreenGradient colors={[palette.bg, '#060B26']} start={[0, 0.7]} />
      <ChatsHeader />
      <FlatList
        data={chatData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatContainer}>
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

const chatData = [
  {
    id: '3',
    name: 'Nostr',
    message: 'i have two NIPs to review',
    avatar: 'https://cloudflare-ipfs.com/ipfs/QmTN4Eas9atUULVbEAbUU8cowhtvK7g3t7jfKztY7wc8eP?.png',
    time: '11:11',
    unreadCount: '91',
  },
  {
    id: '1',
    name: 'Alice',
    message: 'See you then!',
    avatar: 'https://i.pravatar.cc/150?img=5',
    time: '8:38',
    unreadCount: 0,
  },
  {
    id: '2',
    name: 'Bob',
    message: 'Paid you 10000 sats⚡',
    avatar: 'https://i.pravatar.cc/100',
    time: 'Sun',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Grampa',
    message: 'Let us have more wholesome conversation',
    avatar: 'https://i.pravatar.cc/400?img=63',
    time: 'Sat',
    unreadCount: 4,
  },
]
