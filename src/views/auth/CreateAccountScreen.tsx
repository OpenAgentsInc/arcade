import React, { useCallback, useState } from 'react'
import {
    Alert, Platform, StyleSheet, Text, TextInput, View
} from 'react-native'
import { useStore } from 'stores'
import { BackButton, Button, Screen } from 'views/shared'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    marginTop: 40,
    marginLeft: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  formItemContainer: {
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: 40,
    borderRadius: 4,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export const CreateAccountScreen = () => {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [about, setAbout] = useState('')
  const signup = useStore((s) => s.signup)

  const handleSubmit = useCallback(() => {
    const regex = /^[a-zA-Z_\-0-9]+$/
    if (username.length < 3) {
      Alert.alert(
        'Username too short',
        'Please enter a username with at least 3 characters'
      )
      return
    }
    if (!regex.test(username)) {
      Alert.alert(
        'Invalid username',
        'Please enter a username with only alphanumeric characters'
      )
      return
    }
    signup(username, displayName, about)
  }, [username, displayName, about])

  return (
    <Screen preset="fixed">
      <BackButton style={styles.backButton} />
      <View style={styles.container}>
        <Text>Create Account</Text>
        <View style={styles.formContainer}>
          <View style={styles.formItemContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="satoshi"
              value={username}
              onChangeText={(text) => setUsername(text)}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formItemContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Satoshi Nakamoto"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formItemContainer}>
            <Text style={styles.label}>About</Text>
            <TextInput
              style={styles.input}
              placeholder="Creator(s) of Bitcoin."
              value={about}
              onChangeText={(text) => setAbout(text)}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <Button style={styles.button} onPress={handleSubmit}>
            {/* <ChevronsRight size={24} color="#FFFFFF" /> */}
            <Text style={styles.buttonText}>Create</Text>
          </Button>
        </View>
      </View>
    </Screen>
  )
}
