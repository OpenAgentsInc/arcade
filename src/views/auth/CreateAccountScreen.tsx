import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { useStore } from 'stores'
import { BackButton, Button, Screen } from 'views/shared'

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
    <Screen style={styles.container}>
      <BackButton style={styles.backButton} />
      <Text style={styles.headerText}>CrEAtE Account</Text>
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
            placeholderTextColor="#6C7275"
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
            placeholderTextColor="#6C7275"
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
            placeholderTextColor="#6C7275"
          />
        </View>
        <Button style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create</Text>
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    zIndex: 9999,
  },
  headerText: {
    fontSize: 32,
    color: '#fefefe',
    marginTop: 100,
    fontFamily: 'Protomolecule',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formItemContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    alignSelf: 'flex-start',
    width: '100%',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#6C7275',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
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
