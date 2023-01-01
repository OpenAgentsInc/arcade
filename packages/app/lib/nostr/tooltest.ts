// import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import * as secp256k1 from '@noble/secp256k1'

export function generatePrivateKey(): string {
  return secp256k1.utils.bytesToHex(secp256k1.utils.randomPrivateKey())
}

export const tooltest = () => {
  let sk = generatePrivateKey() // `sk` is a hex string
  console.log('sk', sk)
  //   let pk = getPublicKey(sk) // `pk` is a hex string
  //   console.log('pk', pk)
}
