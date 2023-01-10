import * as s from 'lib/storage'
import { generateRandomPlacekitten, timeNowInSeconds } from 'lib/utils'
import { getEventHash, getPublicKey, nip19, signEvent } from 'nostr-tools'

import { login, logout } from './authActions'

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

export const createAuthStore = (set: any, get: any) => ({
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: async (name: string) => set(await login(name)), // old
  loginWithNsec: async (nsec: string) => {
    if (!nsec.startsWith('nsec1') || nsec.length < 60) {
      return
    }
    try {
      const { data } = nip19.decode(nsec)
      const privateKey = data as string
      const publicKey = getPublicKey(privateKey)
      console.log('Decoded publicKey: ', publicKey)
      await s.setItem(s.HEX_PUBKEY_STORAGE_KEY, publicKey)
      await s.setItem(s.HEX_PRIVKEY_STORAGE_KEY, privateKey)
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
      const keys = await login('')
      publicKey = keys.user.publicKey
      privateKey = keys.user.privateKey
    }

    // Get relays from the state
    // const { relays } = state

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

    state.nostr.publish(event)
  },
})

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}
