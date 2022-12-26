import { bip32 } from './bip32'
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39'
import * as Random from 'expo-random'

export function keypairFromSeed(seed: string) {
  const seedBuffer = Buffer.from(seed, 'hex')
  const root = bip32.fromSeed(seedBuffer)
  const key = root.derivePath(`m/44'/1237'/0'/0/0`)
  return {
    privateKey: key.privateKey?.toString('hex'),
    publicKey: key.publicKey.toString('hex'),
  }
}

export function generateSeedWords() {
  return generateMnemonic(128, Random.getRandomBytes)
}

export function seedFromWords(mnemonic: string) {
  return Buffer.from(mnemonicToSeedSync(mnemonic)).toString('hex')
}

export function validateWords(words: string) {
  return validateMnemonic(words)
}
