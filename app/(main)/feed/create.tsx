// src/views/feed/CreatePostScreen.tsx
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { palette } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export default function Page() {
  const [postContent, setPostContent] = useState('')
  const navigation = useNavigation<any>()

  const handleAddMedia = () => {
    // Implement your media upload functionality here
  }

  const handleAddCodeSnippet = () => {
    // Implement your code snippet functionality here
  }

  const handlePost = () => {
    // Implement your posting logic here, then navigate back to MainFeedScreen
    navigation.navigate('MainFeedScreen')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setPostContent}
        value={postContent}
        placeholder="Post content"
        placeholderTextColor={palette.metallic}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddMedia}>
        <Text style={styles.buttonText}>Add Media</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddCodeSnippet}>
        <Text style={styles.buttonText}>Add Code Snippet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    backgroundColor: palette.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: palette.white,
  },
  button: {
    backgroundColor: palette.backgroundBlue,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: palette.white,
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: palette.backgroundBlue,
    borderRadius: 8,
    padding: 16,
  },
  goBackButtonText: {
    fontSize: 16,
    color: palette.white,
    textAlign: 'center',
  },
})
