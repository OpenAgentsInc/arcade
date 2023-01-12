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
    setRelays: (relays: any[]) => set((state) => ({ ...state, relays })),
    addOrModifyRelay: (relay: RelayInfo) => {
      //   console.log('Here and about to add or modify relay: ', relay)

      // Update the state with the new relay
      set((state) => {
        // Copy the current relays
        const currentRelays = [...state.relays]

        // Find the index of the relay to be modified
        const currentRelayIndex = currentRelays.findIndex(
          (r) => r.url === relay.url
        )

        // If the relay already exists in the state
        if (currentRelayIndex !== -1) {
          // Update the existing relay with the new relay information
          currentRelays[currentRelayIndex] = {
            ...currentRelays[currentRelayIndex],
            ...relay,
          }
          // Return the updated state
          return { ...state, relays: currentRelays }
        }
        // If the relay does not exist in the state
        else {
          // Add the new relay to the state
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
