import { webln } from 'alby-js-sdk'
import { Stack } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

declare global {
  interface Window {
    webln: any
  }
}

const testInvoice =
  'lnbc210n1pj9qupqpp5h50wqjvqsmfe2cvde7yu43vgknz6g7ky402pz9hhun6t0e4z7nvqdq5g9kxy7fqd9h8vmmfvdjscqzzsxqyz5vqsp5dgdxv5mpd6tne0x2fqncecty5d294ha3je7utd0gp7zg6rmpnsjs9qyyssq49gkcwh0xru2w7gvzrfhmlgetn3vwmdhpwwpfjef99dueylandpyy8npndjl6l0k8w0vrljg7rfu9rezgxfp5uy256l80fe3n2llz7qpnyyerr'

export default function Alby() {
  const nwcURL = useRef('')
  const [address, onChangeAddress] = useState('')

  async function initAlby() {
    const nwc: any = webln.NostrWebLNProvider.withNewSecret()
    nwcURL.current = nwc.getNostrWalletConnectUrl({
      name: 'Arcade',
      returnTo: document.location.toString(),
    })
    await nwc.initNWC()
  }

  async function zap() {
    const nwc = new webln.NostrWebLNProvider({
      nostrWalletConnectUrl: nwcURL.current,
    })
    await nwc.enable()

    const response: any = await nwc.sendPayment(testInvoice)
    console.info(`payment successful, the preimage is ${response.preimage}`)
  }

  useEffect(() => {
    initAlby()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>alby test</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAddress}
        value={address}
        placeholder="lightning address..."
      />
      <Button onPress={zap} title="Zap" />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
})
