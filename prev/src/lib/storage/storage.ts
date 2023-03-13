import * as SecureStore from 'expo-secure-store'

import {
  API_TOKEN_STORAGE_KEY,
  HEX_PRIVKEY_STORAGE_KEY,
  HEX_PUBKEY_STORAGE_KEY,
} from './storage-constants'

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
    apiToken: await getItem(API_TOKEN_STORAGE_KEY),
    publicKey: await getItem(HEX_PUBKEY_STORAGE_KEY),
    privateKey: await getItem(HEX_PRIVKEY_STORAGE_KEY),
  }
}
