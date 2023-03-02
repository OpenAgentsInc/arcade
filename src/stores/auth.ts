import { HEX_PRIVKEY_STORAGE_KEY, HEX_PUBKEY_STORAGE_KEY } from 'lib/storage'
import * as storage from 'lib/storage'
import { generateRandomPlacekitten, timeNowInSeconds } from 'lib/utils'
import {
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  nip19,
  relayInit,
  signEvent,
} from 'nostr-tools'

export interface AuthState {
  isLoggedIn: boolean
  user: {
    name: string
    publicKey: string
    privateKey: string
  }
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    name: '',
    publicKey: '',
    privateKey: '',
  },
}

export const login = async (name: string, set: any): Promise<AuthState> => {
  const privateKey = generatePrivateKey() // `sk` is a hex string
  const publicKey = getPublicKey(privateKey) // `pk` is a hex string

  try {
    await storage.setItem(HEX_PUBKEY_STORAGE_KEY, publicKey)
    await storage.setItem(HEX_PRIVKEY_STORAGE_KEY, privateKey)
    console.log('Keys saved to local storage')
    set({
      isLoggedIn: true,
      user: { name: '', publicKey, privateKey },
    })
  } catch (e) {
    console.log('Error saving keys to storage:', e)
  }

  if (!privateKey || !publicKey) {
    console.log('Error generating key')
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

export const logout = async (): Promise<AuthState> => {
  console.log('Logging out...')
  await storage.removeItem(HEX_PUBKEY_STORAGE_KEY)
  await storage.removeItem(HEX_PRIVKEY_STORAGE_KEY)
  console.log('Removed keys from storage.')
  return initialState
}

export const createAuthStore = (set: any, get: any) => ({
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: async (name: string) => set(await login(name, set)), // old
  loginWithNsec: async (nsec: string) => {
    if (!nsec.startsWith('nsec1') || nsec.length < 60) {
      return
    }
    try {
      const { data } = nip19.decode(nsec)
      const privateKey = data as string
      const publicKey = getPublicKey(privateKey)
      console.log('Decoded publicKey: ', publicKey)
      await storage.setItem(storage.HEX_PUBKEY_STORAGE_KEY, publicKey)
      await storage.setItem(storage.HEX_PRIVKEY_STORAGE_KEY, privateKey)
      console.log('Keys saved to local storage')
      set({ isLoggedIn: true, user: { name: '', publicKey, privateKey } })
    } catch (e: any) {
      console.log(e)
      alert('Invalid key. Did you copy it correctly?')
    }
  },
  logout: async () => set(await logout()),
  signup: async (username, displayName, about) => {
    // Get the current state
    const state = get()

    // Get the public and private keys of the authed user
    let { publicKey, privateKey } = state.user

    if (!publicKey || !privateKey || publicKey === '' || privateKey === '') {
      const keys = await login('', set)
      publicKey = keys.user.publicKey
      privateKey = keys.user.privateKey
    }

    const metadata = {
      name: username,
      displayName,
      about,
      picture: generateRandomPlacekitten(),
      website: null,
    }

    const event: any = {
      content: JSON.stringify(metadata),
      created_at: timeNowInSeconds(),
      kind: 0,
      pubkey: publicKey,
      tags: [],
    }

    // Set the id and sig properties of the event
    event.id = getEventHash(event)
    event.sig = signEvent(event, privateKey)

    // we aren't yet subscribed to pool which we do in authednavigator, lets just put our metadata on arc relay and get it from there later
    const relay = relayInit('wss://arc1.arcadelabs.co')
    relay.publish(event)
  },
})

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}
