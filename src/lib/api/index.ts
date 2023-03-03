import axios from 'axios'
import { useStore } from 'stores/index'

export const testApiLogin = async () => {
  // fetch the nonce from localhost:8000/api/nonce via axios
  const nonce = await axios.post('http://localhost:8000/api/nonce', {
    pubkey: 'test',
    device_name: 'yooooo',
  })
  const data = await nonce.data
  console.log(data)

  const privateKey = useStore.getState().user.privateKey
  console.log(privateKey)

  // sign the nonce with the private key
  const signature = signEvent(data, privateKey)
  console.log(signature)
}

const signEvent = (event, privateKey) => {
  const eventHash = getEventHash(event)
  const signature = signMessage(eventHash, privateKey)
  return signature
}

const signMessage = (message, privateKey) => {
  const key = ec.keyFromPrivate(privateKey, 'hex')
  const signature = key.sign(message)
  const signatureHex = signature.toDER('hex')
  return signatureHex
}
