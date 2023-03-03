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
  console.log(nonce)

  //   const seed = useStore.getState().user.privateKey
  //   console.log(seed)

  const privateKeyString = useStore.getState().user.privateKey
  console.log(privateKeyString)

  // convert privateKeyString to UInt8Array using Buffer

  const privateKeyUint8Array = Buffer.from(privateKeyString, 'hex')

  //   const privateKeyUint8Array = new Uint8Array(
  //     privateKeyString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  //   )
  //   console.log(privateKeyUint8Array)

  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  )
  const hashBuffer = Buffer.from(hash, 'hex')
  console.log('hash:', hash)

  const privateKey = nacl.sign.keyPair.fromSeed(privateKeyUint8Array).secretKey
  console.log('privateKey:', privateKey)

  const signature = nacl.sign.detached(hashBuffer, privateKey)
  console.log('SIGNATURE?', signature)
}
