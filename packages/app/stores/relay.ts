import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'

export interface RelayState {
  relays: any[]
  subscriptions: any[]
}

const initialRelayState: RelayState = {
  relays: [],
  subscriptions: initialSubscriptions,
}

export const createRelayStore = (set: any) => ({
  relays: initialRelayState.relays,
  subscriptions: initialRelayState.subscriptions,
  relayActions: {
    addRelay: (relay: any) =>
      set((state) => {
        console.log('addempting to addRelay')
        if (state.relays.some((r) => r.url === relay.url)) {
          return state
        }
        console.log('Saving relay URL:', relay.url)
        return {
          relays: [...state.relays, relay],
        }
      }),
  },
})
