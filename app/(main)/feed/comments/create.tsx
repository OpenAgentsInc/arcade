import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'views/shared'
import { palette } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export default function Page() {
  const [comment, setComment] = useState('')
  const navigation = useNavigation()

  const handlePostComment = () => {
    // Implement your logic to submit the comment here

    // Navigate back to the PostDetailScreen
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
        multiline
        textAlignVertical="top"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.postButton}
        onPress={handlePostComment}
        disabled={!comment.trim()}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.almostBlack,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    backgroundColor: palette.white,
    color: palette.black,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  postButton: {
    backgroundColor: palette.backgroundPrimary,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: palette.white,
    textAlign: 'center',
  },
  goBackButton: {
    padding: 8,
  },
  goBackButtonText: {
    color: palette.white,
    textAlign: 'center',
  },
})
