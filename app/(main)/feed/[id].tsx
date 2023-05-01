// src/views/feed/PostDetailScreen.tsx
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { palette } from 'views/theme'
import { useRouter, useSearchParams } from 'expo-router'

export default function Page() {
  const router = useRouter()
  const { id }: any = useSearchParams()

  const handleAddComment = () => {
    router.push('/feed/comments/create')
  }

  const post = {
    // This is a placeholder for the actual post data
    title: 'Example Post Title',
    content: 'Example post content.',
  }

  return (
    <View style={styles.container}>
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{id}</Text>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
      </View>

      {/* Display the list of comments here */}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.zapButton}>
          <Text style={styles.buttonText}>Zap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleAddComment}
        >
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    padding: 16,
  },
  postDetails: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 18,
    color: palette.darkGray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  zapButton: {
    backgroundColor: palette.backgroundMetallicBlue,
    borderRadius: 8,
    padding: 12,
  },
  commentButton: {
    backgroundColor: palette.backgroundMetallicBlue,
    borderRadius: 8,
    padding: 12,
  },
  likeButton: {
    backgroundColor: palette.backgroundMetallicBlue,
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: palette.white,
  },
})
