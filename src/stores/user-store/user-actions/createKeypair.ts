import * as SecureStore from 'expo-secure-store'
import { display } from 'lib'
import { createNewAccount } from 'lib/nostr'
import { UserStore } from '../user-store'

export const createKeypair = async (self: UserStore) => {
  const { mnemonic, publicKey, privateKey } = createNewAccount()
  self.setMnemonic(mnemonic)
  self.setPrivateKey(privateKey)
  self.setPublicKey(publicKey)
  const storeAvailable = await SecureStore.isAvailableAsync()
  if (storeAvailable) {
    await SecureStore.setItemAsync('ARCADE_NPUB', publicKey)
    await SecureStore.setItemAsync('ARCADE_NSEC', privateKey)
    await SecureStore.setItemAsync('ARCADE_MNEMONIC', mnemonic as string)
    display({
      name: 'createKeypair',
      preview: 'Created keypair+mnemonic and persisted to secure storage',
      value: { mnemonic, publicKey, privateKey },
    })
  } else {
    display({
      name: 'createKeypair',
      preview: 'Created keypair+mnemonic, but no secure storage available',
      value: { mnemonic, publicKey, privateKey },
    })
  }
}
