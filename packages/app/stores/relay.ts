import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'

export interface RelayState {
  relays: any[]
  subscriptions: any[]
}

const initialRelayState: RelayState = {
  relays: [],
  subscriptions: initialSubscriptions,
}

export const createRelay = (set: any) => ({
  relays: initialRelayState.relays,
  subscriptions: initialRelayState.subscriptions,
  actions: {
    addRelay: (relay: any) =>
      set((state) => {
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
