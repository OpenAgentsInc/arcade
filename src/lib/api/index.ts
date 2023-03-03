import axios from 'axios'
import { Buffer } from 'buffer'
import * as Crypto from 'expo-crypto'
import { useStore } from 'stores/index'
import * as nacl from 'tweetnacl'

export const testApiLogin = async () => {
  // fetch the nonce from localhost:8000/api/nonce via axios
  const res = await axios.post('http://localhost:8000/api/nonce', {
    pubkey: 'test',
    device_name: 'yooooo',
  })
  const data = await res.data
  const nonce = data.nonce
  const privateKeyString = useStore.getState().user.privateKey
  const privateKeyUint8Array = Buffer.from(privateKeyString, 'hex')
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  )
  const hashBuffer = Buffer.from(hash, 'hex')
  const privateKey = nacl.sign.keyPair.fromSeed(privateKeyUint8Array).secretKey
  const signature = nacl.sign.detached(hashBuffer, privateKey)
  const proof = Buffer.from(signature).toString('hex')
  console.log(proof)
}
