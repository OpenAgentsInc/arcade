import * as SecureStore from 'expo-secure-store'
import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { AuthState, initialState } from './auth'

export const login = async (name: string): Promise<AuthState> => {
  let privateKey = generatePrivateKey() // `sk` is a hex string
  let publicKey = getPublicKey(privateKey) // `pk` is a hex string

  console.log('Identified as ' + publicKey)

  try {
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (storeAvailable) {
      await SecureStore.setItemAsync('ARC_PRIVATE_KEY', privateKey)
      await SecureStore.setItemAsync('ARC_PUBLIC_KEY', publicKey)
      console.log('Keys saved to local storage')
    }
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
