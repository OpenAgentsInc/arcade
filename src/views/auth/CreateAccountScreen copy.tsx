import React, { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { palette } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export const CreateAccountScreen = () => {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [shortBio, setShortBio] = useState('')

  const navigation = useNavigation<any>()

  const handleContinue = () => {
    // Implement your account creation logic here
    navigation.navigate('MainFeedScreen')
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Display name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        placeholder="Short bio"
        value={shortBio}
        onChangeText={setShortBio}
        style={styles.input}
      />
      {/* Implement your image upload logic for the avatar here */}
      <Button title="Continue" onPress={handleContinue} />
      <Button
        title="Go back"
        onPress={() => navigation.navigate('SplashScreen')}
        // style={styles.goBackButton}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.backgroundPrimary,
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  goBackButton: {
    marginTop: 10,
  },
})
