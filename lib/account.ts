// import { generateSeedWords } from './nip06'
import { generateMnemonic } from 'bip39'
import * as Random from 'expo-random'

export const createNewAccount = () => {
  console.log('Lets create a new account. Attempting to generate seed words for mnemonic...')
  const mnemonic = generateSeedWords()
  console.log('DID?', mnemonic)
  return {
    mnemonic: mnemonic,
    privateKey: '',
    publicKey: '',
  }
}

export function generateSeedWords() {
  console.log('attempting')
  // @ts-ignore
  return generateMnemonic(128, Random.getRandomBytes)
}
