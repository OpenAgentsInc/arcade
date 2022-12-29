import { getPublicKey } from './keys'
import { generateSeedWords, keypairFromSeed, privateKeyFromSeed, seedFromWords } from './nip06'

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const { privateKey, publicKey } = keypairFromSeed(seed)
  console.log('Public key: ', publicKey)
  return {
    mnemonic,
    privateKey,
    publicKey,
  }
}

export const getKeysForMnemonic = (mnemonic: string) => {
  const seed = seedFromWords(mnemonic)
  const privateKey = privateKeyFromSeed(seed) as string
  const publicKey = getPublicKey(Buffer.from(privateKey, 'hex').slice(-32))
  return {
    privateKey,
    publicKey,
  }
}

// export const getKeysForNsec = (nsec: string) => {
//   const decoded = bech32.decode(nsec)
//   const privateKey = bech32.fromWords(decoded.words)
//   if (privateKey.length !== 32) {
//     throw new Error('Invalid private key')
//   }
//   const publicKey = getPublicKey(Buffer.from(privateKey))
//   const hexKey = toHexString(privateKey)
//   return {
//     privateKey: hexKey,
//     publicKey,
//   }
// }

// function toHexString(byteArray) {
//   return Array.from(byteArray, function (byte: any) {
//     return ('0' + (byte & 0xff).toString(16)).slice(-2)
//   }).join('')
// }
