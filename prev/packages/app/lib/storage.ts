import AsyncStorage from '@react-native-async-storage/async-storage'
import { HEX_PRIVKEY_STORAGE_KEY, HEX_PUBKEY_STORAGE_KEY } from './constants'

export function getItem(key) {
  return AsyncStorage.getItem(key)
}

export function setItem(key, value) {
  return AsyncStorage.setItem(key, value)
}

export function removeItem(key) {
  return AsyncStorage.removeItem(key)
}

export async function getKeys() {
  return {
    publicKey: await getItem(HEX_PUBKEY_STORAGE_KEY),
    privateKey: await getItem(HEX_PRIVKEY_STORAGE_KEY),
  }
}
