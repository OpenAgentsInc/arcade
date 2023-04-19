// src/views/feed/components/SearchBar.tsx
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { palette } from 'views/theme'

export const SearchBar = ({ onChangeText, placeholder }) => {
  return (
    <TextInput
      style={styles.container}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={palette.metallic}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.backgroundPrimary,
    borderRadius: 8,
    padding: 12,
    paddingLeft: 16,
    fontSize: 16,
    marginBottom: 16,
  },
})
