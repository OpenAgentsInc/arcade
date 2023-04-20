import { useAuthed } from 'lib/hooks/useAuthed'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { palette, typography } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
  const [accessKey, setAccessKey] = useState('')
  const navigation = useNavigation<any>()
  const { authed, login } = useAuthed()

  useEffect(() => {
    console.log('whattttt', authed)
  }, [authed])

  const handleLogin = () => {
    // Perform login logic here, then navigate to MainFeedScreen
    login()
    console.log('???')
    // navigation.navigate('TabNavigator')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAccessKey}
        value={accessKey}
        placeholder="Enter access key"
        placeholderTextColor={'#555'}
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
    fontFamily: typography.bold,
    fontSize: 24,
    color: palette.white,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: palette.darkGray,
    color: palette.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
})
