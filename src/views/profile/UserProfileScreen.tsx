import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { palette } from 'views/theme'

export const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>{/* Display user details here */}</View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.buttonText}>Follow/Unfollow</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    // Add user details styles here
  },
  followButton: {
    backgroundColor: palette.backgroundPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: palette.backgroundBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: palette.white,
    fontWeight: 'bold',
  },
})
