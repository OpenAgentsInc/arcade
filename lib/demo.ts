// import { Buffer } from 'buffer'
import { createNewAccount } from './account'
import { bip32 } from './bip32'
import {
  getEventHash,
  NostrEventToSerialize,
  NostrEventToSign,
  NostrKind,
  signEvent,
} from './nip01'
import { timeNowInSeconds } from './timeNowInSeconds'

export const fromTheTop = async () => {
  try {
    console.log('ATTEMPTING')
    const { privateKey, publicKey } = createNewAccount()
    console.log('privateKey:', privateKey)
    console.log('publicKey:', publicKey)
  } catch (e) {
    console.log('EEEEEE?E?E??E')
    console.log(e)
    return
  }

  //   if (!privateKey || !publicKey) {
  //     return false
  //   }
  console.log('here so far')
  return
}
