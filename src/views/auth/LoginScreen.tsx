import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useStore } from 'stores'
import { BackButton, Screen } from 'views/shared'

export const LoginScreen = () => {
  const loginWithNsec = useStore((s) => s.loginWithNsec)
  const [nsec, setNsec] = useState('')
  return (
    <Screen>
      <BackButton style={styles.backButton} />
      <View style={styles.container}>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Text style={styles.headerText}>EntEr accEss kEy</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="nsec1..."
              placeholderTextColor="#6C7275"
              spellCheck={false}
              value={nsec}
              onChangeText={(text) => {
                setNsec(text)
                loginWithNsec(text)
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 40,
    marginLeft: 20,
    zIndex: 9999,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    color: '#fefefe',
    marginBottom: 32,
    marginTop: 80,
    fontFamily: 'Protomolecule',
    textAlign: 'center',
  },
  textInputContainer: {
    // alignItems: 'center',
    width: '100%',
    backgroundColor: '#232627',
    padding: 16,
    borderRadius: 12,
  },
})
