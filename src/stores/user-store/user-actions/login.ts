import * as SecureStore from 'expo-secure-store'
import { display } from 'lib'
import { getKeysForMnemonic, getKeysForNsec, hexToNsec } from 'lib/nostr'
import { Alert } from 'react-native'
import { UserStore } from '../user-store'

export const login = async (self: UserStore, text: string) => {
  self.reset()
  const loginWithMnemonic = async (mnemonic: string) => {
    const { privateKey, publicKey } = getKeysForMnemonic(mnemonic)
    const newAccountKeys: AccountKeys = { mnemonic, privateKey, publicKey }
    self.setMnemonic(mnemonic)
    self.setPrivateKey(privateKey)
    self.setPublicKey(publicKey)
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (storeAvailable) {
      await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
      await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
      await SecureStore.setItemAsync('ARCADE_MNEMONIC', newAccountKeys.mnemonic as string)
      display({
        name: 'login',
        preview: 'Logged in and persisted to secure storage',
        value: newAccountKeys,
      })
    } else {
      display({
        name: 'login',
        preview: 'Logged in, but no secure storage available',
        value: newAccountKeys,
      })
    }
  }

  const loginWithNsec = async (nsec: string) => {
    const { privateKey, publicKey } = getKeysForNsec(nsec)
    const newAccountKeys: AccountKeys = { privateKey, publicKey }
    self.setPrivateKey(privateKey)
    self.setPublicKey(publicKey)
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (storeAvailable) {
      await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
      await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
    }
  }

  try {
    if (text.split(' ').length === 12) {
      loginWithMnemonic(text)
    } else if (text.startsWith('nsec')) {
      loginWithNsec(text)
    } else if (text.length > 12) {
      loginWithNsec(hexToNsec(text))
    } else {
      return false
    }

    self.rootStore.relay.fetchUser(self.publicKey as string)
    self.setAuthed(true)
    return true
  } catch (e) {
    // self.setLoggingIn(false)
    console.log('Error trying to validate access code')
    Alert.alert('Login error')
    console.log(e)
    return false
  }
}

export interface AccountKeys {
  mnemonic?: string
  publicKey: string
  privateKey: string
}
