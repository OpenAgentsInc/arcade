import { DEFAULT_RELAYS } from 'app/lib/constants/relays'

export interface RelayInfo {
  url: string
  status: string
  connected: boolean
}

export interface RelayState {
  relays: RelayInfo[]
}

const initialRelayState: RelayState = {
  relays: DEFAULT_RELAYS.map((url) => ({
    url,
    status: 'not-connected',
    connected: false,
  })),
}

export const createRelayStore = (set: any, get: any) => ({
  relays: initialRelayState.relays,
  relayActions: {
    addOrModifyRelay: (relay: any) => {
      console.log('Here and about to add or modify relay: ', relay)
      set((state) => {
        const currentRelays = state.relays
        const currentRelayIndex = currentRelays.findIndex(
          (r: any) => r.url === relay.url
        )
        if (currentRelayIndex !== -1) {
          currentRelays[currentRelayIndex] = {
            ...currentRelays[currentRelayIndex],
            ...relay,
          }
          //   console.log('returning:', { ...state, relays: currentRelays })
          return { ...state, relays: currentRelays }
        } else {
          //   console.log('elsereturning:', {
          // ...state,
          // relays: [...currentRelays, relay],
          //   })
          return { ...state, relays: [...currentRelays, relay] }
        }
      })
    },
    removeRelay: (url: string) =>
      set((state: RelayState) => {
        if (!state.relays.some((r) => r.url === url)) {
          return state
        }
        return {
          relays: state.relays.filter((r) => r.url !== url),
        }
      }),
  },
})
