import React from 'react'
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { palette } from 'views/theme'

export const NotificationsScreen = () => {
  const notifications = [
    // Dummy data for notifications list
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            {/* Display notification details here */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.clearButton}>
        <Text style={styles.buttonText}>Clear All Notifications</Text>
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
  notificationItem: {
    // Add notification item styles here
  },
  clearButton: {
    backgroundColor: palette.backgroundPrimary,
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
