export interface RelayState {
  relays: any[]
}

const initialRelayState: RelayState = {
  relays: [],
}

export const createRelayStore = (set: any, get: any) => ({
  relays: initialRelayState.relays,
  relayActions: {
    addRelay: (relay: any) =>
      set((state) => {
        if (state.relays.some((r) => r.url === relay.url)) {
          return state
        }
        return {
          relays: [...state.relays, relay],
        }
      }),
    removeRelay: (relay: any) =>
      set((state) => {
        if (!state.relays.some((r) => r.url === relay.url)) {
          return state
        }
        return {
          relays: state.relays.filter((r) => r.url !== relay.url),
        }
      }),
  },
})
