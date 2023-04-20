// src/views/feed/MainFeedScreen.tsx
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { palette } from 'views/theme'
import { CreatePostButton } from './components/CreatePostButton'
import { PostItem } from './components/PostItem'
import { SearchBar } from './components/SearchBar'

export const MainFeedScreen = () => {
  // Replace this with the actual data from your backend or state management
  const posts = [
    /* ... */
  ]

  const renderItem = ({ item }) => {
    // Customize the PostItem component as needed
    return <PostItem post={item} />
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search" onChangeText={() => {}} />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <CreatePostButton
        onPress={() => {
          // Navigate to the create post screen
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.almostBlack,
  },
  listContent: {
    padding: 10,
  },
})
