import BIP32Factory from 'bip32'
import * as ecc from 'tiny-secp256k1-v1/js.js'

export function keypairFromSeed(seed: string) {
  const seedBuffer = Buffer.from(seed, 'hex')

  const bip32 = BIP32Factory(ecc)

  const root = bip32.fromSeed(seedBuffer)
  const key = root.derivePath(`m/44'/1237'/0'/0/0`)

  return {
    privateKey: key.privateKey?.toString('hex'),
    publicKey: key.publicKey.toString('hex'),
  }
}
