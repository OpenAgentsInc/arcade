import {
  HEX_PRIVKEY_STORAGE_KEY,
  HEX_PUBKEY_STORAGE_KEY,
} from 'app/lib/constants'
import * as storage from 'app/lib/storage'
import { generatePrivateKey, getPublicKey } from 'nostr-tools'

import { useStore } from '.'
import { AuthState, initialState } from './auth'

export const login = async (name: string): Promise<AuthState> => {
  const privateKey = generatePrivateKey() // `sk` is a hex string
  const publicKey = getPublicKey(privateKey) // `pk` is a hex string

  try {
    await storage.setItem(HEX_PUBKEY_STORAGE_KEY, publicKey)
    await storage.setItem(HEX_PRIVKEY_STORAGE_KEY, privateKey)
    console.log('Keys saved to local storage')
    useStore.setState({
      isLoggedIn: true,
      user: { name: '', publicKey, privateKey },
    })
  } catch (e) {
    console.log('Error saving keys to storage:', e)
  }

  if (!privateKey || !publicKey) {
    console.log('Error generating key')
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

export const logout = async (): Promise<AuthState> => {
  console.log('Logging out...')
  await storage.removeItem(HEX_PUBKEY_STORAGE_KEY)
  await storage.removeItem(HEX_PRIVKEY_STORAGE_KEY)
  console.log('Removed keys from storage.')
  return initialState
}
