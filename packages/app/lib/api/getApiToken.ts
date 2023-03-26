import * as secp256k1 from '@noble/secp256k1'
import axios from 'axios'
// import * as Crypto from 'expo-crypto'
import * as storage from 'app/lib/storage'
import { randomFourLetterString } from 'app/lib/utils'

import { API_URL } from './url'

export const getApiToken = async ({ publicKey, privateKey }) => {
  const device_name = `Unknown Device ${randomFourLetterString()}`
  const res = await axios.post(`${API_URL}/api/nonce`, {
    pubkey: publicKey,
    device_name,
  })
  const data = await res.data
  const nonce = data.nonce
  const secpPublicKey = secp256k1.getPublicKey(privateKey)
  console.log('skipping this step')
  //   const hash = await Crypto.digestStringAsync(
  //     Crypto.CryptoDigestAlgorithm.SHA256,
  //     nonce
  //   )

  //   const signature = secp256k1.utils.bytesToHex(
  //     secp256k1.signSync(hash, privateKey)
  //   )

  //   const res2 = await axios.post(`${API_URL}/api/login`, {
  //     pubkey: publicKey,
  //     secp_pubkey: secp256k1.utils.bytesToHex(secpPublicKey),
  //     device_name,
  //     signature,
  //     nonce,
  //     hash,
  //   })
  //   const data2 = await res2.data
  //   const apiToken = data2.token
  //   await storage.setItem(storage.API_TOKEN_STORAGE_KEY, apiToken)
  return ''
}
