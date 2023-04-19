import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { palette } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
  const [accessKey, setAccessKey] = useState('')
  const navigation = useNavigation()

  const handleLogin = () => {
    // Perform login logic here, then navigate to MainFeedScreen
    navigation.navigate('MainFeedScreen')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAccessKey}
        value={accessKey}
        placeholder="Enter access key"
        placeholderTextColor={palette.metallic}
        secureTextEntry
      />
      <Button onPress={handleLogin} title="Login" />
      <Button onPress={() => navigation.goBack()} title="Go Back" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.black,
  },
  title: {
    fontSize: 24,
    color: palette.white,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: palette.darkGray,
    color: palette.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
})
