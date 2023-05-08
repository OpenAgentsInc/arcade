import { hexToBech32 } from 'lib/utils'
import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const PlaceholderSplash = () => {
  useEffect(() => {
    console.log('Testing key gen...')
    const privateKey = generatePrivateKey()
    const publicKey = getPublicKey(privateKey)
    const npub = hexToBech32('npub', publicKey)
    console.log('npub:', npub)
    const nsec = hexToBech32('nsec', privateKey)
    console.log('nsec:', nsec)
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>arcaDE</Text>
      <Text style={styles.subtitle}>CommErcE 2.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Protomolecule',
    fontSize: 60,
    textShadowColor: 'cyan',
    textShadowRadius: 14,
  },
  subtitle: {
    color: '#fff',
    fontFamily: 'Protomolecule',
    fontSize: 20,
    textShadowColor: 'cyan',
    textShadowRadius: 14,
    marginTop: 20,
  },
})
