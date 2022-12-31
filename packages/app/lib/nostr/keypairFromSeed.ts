// import { bip32 } from './bip32'

import { HDKey } from '@scure/bip32'

// import BIP32Factory from 'bip32'
// import * as ecc from 'tiny-secp256k1-v1/js.js'

export function keypairFromSeed(seed: string) {
  const seedBuffer = Buffer.from(seed, 'hex')

  const wat = HDKey.fromMasterSeed(seedBuffer)
  console.log('WAT', wat)

  //   console.log(BIP32Factory)
  //   console.log(ecc)
  //   const root = bip32.fromSeed(seedBuffer)
  //   const key = root.derivePath(`m/44'/1237'/0'/0/0`)
  return {
    privateKey: '',
    publicKey: '',
  }
  //   return {
  //     privateKey: key.privateKey?.toString('hex'),
  //     publicKey: key.publicKey.toString('hex'),
  //   }
}
