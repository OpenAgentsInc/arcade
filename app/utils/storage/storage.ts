import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Buffer } from "buffer";
import crypto from "isomorphic-webcrypto";

const utf8Encoder = new TextEncoder()
const utf8Decoder = new TextDecoder()

async function appKey(): Promise<Uint8Array> {
    try {
        const appkB64 = await SecureStore.getItemAsync("appk")
        if (appkB64 && appkB64.length) {
            return Uint8Array.from(Buffer.from(appkB64, "base64"))
        }
    } catch {
    }

    const appk = new Uint8Array(32);
    crypto.getRandomValues(appk)
    await SecureStore.setItemAsync("appk", Buffer.from(appk).toString("base64"))
    return appk
}

async function toIv(key: string): Promise<Uint8Array> {
    const data = utf8Encoder.encode(key);
    const hash = await crypto.subtle.digest({name: "SHA-256"}, data);
    return new Uint8Array(hash.slice(0, 16))
}

async function encrypt(key: string, val: string) {
    const iv = await toIv(key)
    const appk = await appKey();
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      appk,
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    );
    
    const plaintext = utf8Encoder.encode(val);
    
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      cryptoKey,
      plaintext
    );

    return Buffer.from(ciphertext).toString("base64")
}

async function decrypt(key: string, val: string) {
    const iv = await toIv(key)
    const appk = await appKey();
    const ciphertext = Buffer.from(val, "base64")
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      appk,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      cryptoKey,
      ciphertext
    );
    const text = utf8Decoder.decode(plaintext);
    return text
}


/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    const val = await AsyncStorage.getItem(key)
    if (val == null) return val
    return await decrypt(key, val)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, await encrypt(key, value))
    return true
  } catch (e) {
    console.log("failed store", e)
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const val = await AsyncStorage.getItem(key)
    if (val == null) return val
    const almostThere = await decrypt(key, val)
    return JSON.parse(almostThere)
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, await encrypt(key, JSON.stringify(value)))
    return true
  } catch (e) {
    console.log("failed store", e)
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
    await AsyncStorage.clear()
}
