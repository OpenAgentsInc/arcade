import { createMnemonic, keypairFromSeed, seedFromWords } from 'app/lib/nostr'
import { AuthState, initialState } from './auth'

export const login = async (name: string): Promise<AuthState> => {
  // Create NIP-06 keypair (https://github.com/nostr-protocol/nips/blob/master/06.md)
  const mnemonic = await createMnemonic()
  const seed = seedFromWords(mnemonic)
  const { privateKey, publicKey } = keypairFromSeed(seed)
  console.log('Identified as ' + publicKey)

  if (!privateKey || !publicKey) {
    throw new Error('Error generating key')
  }

  return {
    isLoggedIn: true,
    user: {
      name,
      mnemonic,
      publicKey,
      privateKey,
    },
  }
}

export const logout = (): AuthState => {
  return initialState
}
