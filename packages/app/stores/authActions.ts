import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { AuthState, initialState } from './auth'

export const login = async (name: string): Promise<AuthState> => {
  let privateKey = generatePrivateKey() // `sk` is a hex string
  let publicKey = getPublicKey(privateKey) // `pk` is a hex string

  console.log('Identified as ' + publicKey)

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
