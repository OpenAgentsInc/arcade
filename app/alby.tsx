import { webln } from 'alby-js-sdk'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Alby() {
  async function connectToAlby() {
    // if (!window.webln) {
    try {
      const nostrWalletConnectUrl = 'https://arcade.chat/nwc-test' // Replace this with your own NWC url loading mechanism
      console.log('so')
      const nwc = new webln.NostrWebLNProvider({ nostrWalletConnectUrl })
      console.log(nwc)
      await nwc.enable()
      console.log('?')
      window.webln = nwc
    } catch (error) {
      console.error('Error connecting to Alby wallet:', error)
      // Handle errors and inform the user about the connection issue
    }
    // } else {
    //   console.log('got webln', window.webln)
    // }
  }
  useEffect(() => {
    console.log(webln)
    connectToAlby()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>alby test</Text>
      <Stack.Screen options={{ title: 'Alby Test' }} />
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
