import { webln } from 'alby-js-sdk'
import { Stack } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

declare global {
  interface Window {
    webln: any
  }
}

export default function Alby() {
  const nwcURL = useRef('')
  const [address, onChangeAddress] = useState('')
  const [message, setMessage] = useState('Zap')

  async function initAlby() {
    const nwc: any = webln.NostrWebLNProvider.withNewSecret()
    nwcURL.current = nwc.getNostrWalletConnectUrl({
      name: 'Arcade',
      returnTo: document.location.toString(),
    })
    await nwc.initNWC()
  }

  function getInvoiceFromAddress(address: string) {
    const addrRegex = /\S+@\S+\.\S+/
    if (addrRegex.test(address)) {
      return fetch(
        `https://lnaddressproxy.getalby.com/generate-invoice?ln=${address}&amount=21000&comment=test`
      )
        .then((response) => response.json())
        .then((json) => {
          return json.invoice.pr
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      console.log('lightning address not valid')
    }
  }

  async function sendZap() {
    setMessage('Processing...')
    const invoice = await getInvoiceFromAddress(address)

    if (invoice) {
      const nwc = new webln.NostrWebLNProvider({
        nostrWalletConnectUrl: nwcURL.current,
      })
      await nwc.enable()

      const response: any = await nwc.sendPayment(invoice)
      setMessage(`payment successful, the preimage is ${response.preimage}`)
    } else {
      setMessage('invoice invalid')
    }
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
      <Button onPress={sendZap} title={message} />
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
