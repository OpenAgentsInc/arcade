// src/views/feed/components/PostItem.tsx
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { palette } from 'views/theme'

export const PostItem = ({ post }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: palette.darkGray,
  },
})
