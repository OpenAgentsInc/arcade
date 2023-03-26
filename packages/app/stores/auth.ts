import { getApiToken } from 'app/lib/api'
import { saveNewUserMetadata } from 'app/lib/nostr/saveNewUserMetadata'
import {
  API_TOKEN_STORAGE_KEY,
  HEX_PRIVKEY_STORAGE_KEY,
  HEX_PUBKEY_STORAGE_KEY,
} from 'app/lib/storage'
import * as storage from 'app/lib/storage'
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools'
import { hexToBech32 } from 'app/lib/utils'

export interface AuthState {
  apiToken: string | null
  isLoggedIn: boolean
  user: {
    publicKey: string
    privateKey: string
  }
}

export const initialState: AuthState = {
  apiToken: null,
  isLoggedIn: false,
  user: {
    publicKey: '',
    privateKey: '',
  },
}

export const login = async (set: any): Promise<AuthState> => {
  const privateKey = generatePrivateKey() // `sk` is a hex string
  const publicKey = getPublicKey(privateKey) // `pk` is a hex string

  const apiToken: string | null = null

  try {
    await storage.setItem(HEX_PUBKEY_STORAGE_KEY, publicKey)
    await storage.setItem(HEX_PRIVKEY_STORAGE_KEY, privateKey)
    console.log(hexToBech32('nsec', privateKey))
    console.log('Keys saved to local storage')
    set({
      apiToken,
      isLoggedIn: true,
      user: { publicKey, privateKey },
    })
  } catch (e) {
    console.log('Error saving keys to storage:', e)
  }

  if (!privateKey || !publicKey) {
    console.log('Error generating key')
  }

  return {
    apiToken: null,
    isLoggedIn: true,
    user: {
      publicKey,
      privateKey,
    },
  }
}

export const logout = async (): Promise<AuthState> => {
  console.log('Logging out...')
  await storage.removeItem(HEX_PUBKEY_STORAGE_KEY)
  await storage.removeItem(HEX_PRIVKEY_STORAGE_KEY)
  await storage.removeItem(API_TOKEN_STORAGE_KEY)
  console.log('Removed keys and apitoken from storage.')
  return initialState
}

export const createAuthStore = (set: any, get: any) => ({
  apiToken: initialState.apiToken,
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: async () => set(await login(set)), // yuck
  loginWithNsec: async (nsec: string) => {
    if (!nsec.startsWith('nsec1') || nsec.length < 60) {
      return
    }
    let apiToken: string | null = null
    try {
      const { data } = nip19.decode(nsec)
      const privateKey = data as string
      const publicKey = getPublicKey(privateKey)
      await storage.setItem(storage.HEX_PUBKEY_STORAGE_KEY, publicKey)
      await storage.setItem(storage.HEX_PRIVKEY_STORAGE_KEY, privateKey)
      console.log('Keys saved to local storage')
      apiToken = await getApiToken({ privateKey, publicKey })
      set({
        apiToken,
        isLoggedIn: true,
        user: { name: '', publicKey, privateKey },
      })
    } catch (e: any) {
      console.log(e)
      alert('Invalid key. Did you copy it correctly?')
    }
  },
  logout: async () => set(await logout()),
  signup: async (username: string, displayName: string, about: string) => {
    // Get the public and private keys of the authed user
    let { publicKey, privateKey } = get().user

    // If no keys, generate them
    if (!publicKey || !privateKey || publicKey === '' || privateKey === '') {
      const keys = await login(set)
      publicKey = keys.user.publicKey
      privateKey = keys.user.privateKey
    }

    // Save kind0 metadata to Arc Nostr relay
    saveNewUserMetadata({
      about,
      displayName,
      publicKey,
      privateKey,
      username,
    })

    // Auth user to API
    // const apitoken = await getApiToken({ publicKey, privateKey })

    // save apitoken to expo securestore
    // set({ apiToken: apitoken, user: { publicKey, privateKey } })
    set({ apiToken: 'dummy', user: { publicKey, privateKey } })
    // console.log('API token set and saved.')
  },
})

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}
