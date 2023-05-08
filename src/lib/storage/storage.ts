import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    HEX_PRIVKEY_STORAGE_KEY, HEX_PUBKEY_STORAGE_KEY
} from './storage-constants'

export async function getItem(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch (e) {
    console.error('Error getting item from AsyncStorage:', e)
    return null
  }
}

export async function setItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.error('Error setting item in AsyncStorage:', e)
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.error('Error removing item from AsyncStorage:', e)
  }
}

export async function getKeys() {
  return {
    publicKey: await getItem(HEX_PUBKEY_STORAGE_KEY),
    privateKey: await getItem(HEX_PRIVKEY_STORAGE_KEY),
  }
}
