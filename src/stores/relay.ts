import { DEFAULT_RELAYS } from 'lib/constants/relays'

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
          return { ...state, relays: currentRelays }
        } else {
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
