import axios from 'axios'
import * as Crypto from 'expo-crypto'
import { useStore } from 'stores/index'
import * as nacl from 'tweetnacl'

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
}
