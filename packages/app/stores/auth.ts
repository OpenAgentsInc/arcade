import { generateRandomPlacekitten, timeNowInSeconds } from 'app/lib/utils'
import { getEventHash, signEvent } from 'nostr-tools'
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
  login: async (name: string) => set(await login(name)),
  logout: async () => set(await logout()),
  signup: async (username, displayName, about) => {
    // Get the current state
    const state = get()

    // Get the public and private keys of the authed user
    let { publicKey, privateKey } = state.user

    if (!publicKey || !privateKey || publicKey === '' || privateKey === '') {
      console.log('no pub and priv')
      let keys = await login('')
      publicKey = keys.user.publicKey
      privateKey = keys.user.privateKey
    }

    // Get relays from the state
    const { relays } = state

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

    console.log('Signed event: ', event)
    console.log('Publishing to relays: ', relays)

    // Publish the event to all of the relays
    relays.forEach((relay) => {
      console.log('Publishing to relay: ', relay.url)
      let pub = relay.publish(event)
      pub.on('ok', () => {
        console.log(`${relay.url} has accepted our event`)
      })
      pub.on('seen', () => {
        console.log(`we saw the event on ${relay.url}`)
      })
      pub.on('failed', (reason) => {
        console.log(`failed to publish to ${relay.url}: ${reason}`)
      })
    })
  },
})

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}
