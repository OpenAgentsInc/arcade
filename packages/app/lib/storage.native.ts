import * as SecureStore from 'expo-secure-store'
import { HEX_PRIVKEY_STORAGE_KEY, HEX_PUBKEY_STORAGE_KEY } from './constants'

export function getItem(key) {
  return SecureStore.getItemAsync(key)
}

export function setItem(key, value) {
  return SecureStore.setItemAsync(key, value)
}

export function removeItem(key) {
  return SecureStore.deleteItemAsync(key)
}

export async function getKeys() {
  return {
    publicKey: await getItem(HEX_PUBKEY_STORAGE_KEY),
    privateKey: await getItem(HEX_PRIVKEY_STORAGE_KEY),
  }
}
