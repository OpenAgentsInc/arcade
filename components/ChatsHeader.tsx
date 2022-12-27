import { Entypo, EvilIcons, FontAwesome5, Foundation } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'

export const ChatsHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Chats</Text>
        <View style={styles.iconsContainer}>
          {/* <TouchableOpacity>
            <Foundation name='pencil' size={24} color='white' />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <Entypo name='dots-three-vertical' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <EvilIcons name='search' size={24} color='#6F8298' style={styles.searchIcon} />
        {/* <Image source={require('./search.png')} style={styles.searchIcon} /> */}
        <TextInput
          placeholder='Search messages or users'
          placeholderTextColor='#6F8298'
          style={styles.searchInput}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>All chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bitcoin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Personal</Text>
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
    backgroundColor: '#253244',
    borderRadius: 5,
    margin: 10,
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
    padding: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2340',
    marginBottom: 10,
  },
})
