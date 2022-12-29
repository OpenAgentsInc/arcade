// import { bech32 } from 'bech32'
// import { Buffer } from 'buffer'
// import { getPublicKey } from './keys'
import { getPublicKey } from './keys'
import { generateSeedWords, keypairFromSeed, privateKeyFromSeed, seedFromWords } from './nip06'

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const { privateKey, publicKey } = keypairFromSeed(seed)
  //   const pubbuffer = Buffer.from(publicKeyAlmost, 'hex')
  //   const pubbuffer2 = pubbuffer.slice(1)
  //   const publicKey = pubbuffer2.toString('hex')
  console.log('publicKey:', publicKey)
  console.log('publickey LENGTH:', publicKey.length)
  return {
    mnemonic,
    privateKey,
    publicKey,
  }
}

// export const createNewAccount = () => {
//   const mnemonic = generateSeedWords()
//   // const seed = seedFromWords(mnemonic)
//   const { privateKey, publicKey } = getKeysForMnemonic(mnemonic)
//   // const pubbuffer = Buffer.from(publicKey, 'hex')
//   // const pubbuffer2 = pubbuffer.slice(1)

//   console.log('publicKey:', publicKey)
//   console.log('publickey LENGTH:', publicKey.length)

//   console.log('returnign:', {
//     mnemonic,
//     privateKey,
//     publicKey,
//   })

//   return {
//     mnemonic,
//     privateKey,
//     publicKey, //: pubbuffer2.toString('hex'),
//   }

//   //   const { privateKey, publicKey } = keypairFromSeed(seed)
//   //   return {
//   //     mnemonic,
//   //     privateKey,
//   //     publicKey,
//   //   }
// }

// export const createNewAccount = () => {
//   const mnemonic = generateSeedWords()
//   const seed = seedFromWords(mnemonic)
//   const { privateKey, publicKey } = keypairFromSeed(seed)
//   const pubbuffer = Buffer.from(publicKey, 'hex')
//   const pubbuffer2 = pubbuffer.slice(1)

//   console.log('returnign:', {
//     mnemonic,
//     privateKey,
//     publicKey: pubbuffer2.toString('hex'),
//   })

//   return {
//     mnemonic,
//     privateKey,
//     publicKey: pubbuffer2.toString('hex'),
//   }

//   //   const { privateKey, publicKey } = keypairFromSeed(seed)
//   //   return {
//   //     mnemonic,
//   //     privateKey,
//   //     publicKey,
//   //   }
// }

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
