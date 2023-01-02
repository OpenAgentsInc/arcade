import { HEX_PRIVKEY_STORAGE_KEY, HEX_PUBKEY_STORAGE_KEY } from 'app/lib/constants'
import * as storage from 'app/lib/storage'
import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { AuthState, initialState } from './auth'

export const login = async (name: string): Promise<AuthState> => {
  let privateKey = generatePrivateKey() // `sk` is a hex string
  let publicKey = getPublicKey(privateKey) // `pk` is a hex string

  console.log('Identified as ' + publicKey)

  try {
    await storage.setItem(HEX_PUBKEY_STORAGE_KEY, publicKey)
    await storage.setItem(HEX_PRIVKEY_STORAGE_KEY, privateKey)
    console.log('Keys saved to local storage')
  } catch (e) {
    console.log('Error saving keys to storage:', e)
  }

  if (!privateKey || !publicKey) {
    throw new Error('Error generating key')
  }

  return {
    isLoggedIn: true,
    user: {
      name,
      publicKey,
      privateKey,
    },
  }
}

export const logout = (): AuthState => {
  return initialState
}
