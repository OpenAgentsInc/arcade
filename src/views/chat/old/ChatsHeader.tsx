import { Entypo, EvilIcons, FontAwesome5, Foundation } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'

export const ChatsHeader = () => {
  const [activeButton, setActiveButton] = useState('All chats')
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Chats</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Entypo name='dots-three-vertical' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <EvilIcons name='search' size={24} color='#6F8298' style={styles.searchIcon} />
        <TextInput
          placeholder='Search messages or users'
          placeholderTextColor='#6F8298'
          style={styles.searchInput}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setActiveButton('All chats')}>
          <Text
            style={[
              styles.buttonText,
              activeButton === 'All chats' ? styles.activeButtonText : null,
            ]}>
            All chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setActiveButton('Bitcoin')}>
          <Text
            style={[
              styles.buttonText,
              activeButton === 'Bitcoin' ? styles.activeButtonText : null,
            ]}>
            Bitcoin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setActiveButton('Personal')}>
          <Text
            style={[
              styles.buttonText,
              activeButton === 'Personal' ? styles.activeButtonText : null,
            ]}>
            Personal
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(37, 50, 68, 0.5)',
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    paddingBottom: 0,
  },
  divider: {
    height: 2,
    backgroundColor: '#1E2340',
    marginBottom: 10,
    marginTop: -2,
    zIndex: -1,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeButtonText: {
    borderBottomWidth: 2,
    borderBottomColor: '#329FFD',
    paddingTop: 12,
    paddingBottom: 12,
    zIndex: 10,
    elevation: 100,
  },
})
