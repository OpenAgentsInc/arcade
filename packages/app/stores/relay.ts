import { initialSubscriptions } from 'app/features/chat/initialSubscriptions'

export interface RelayState {
  relays: any[]
  subscriptions: any[]
}

const initialRelayState: RelayState = {
  relays: [],
  subscriptions: initialSubscriptions,
}

export const createRelayStore = (set: any, get: any) => ({
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
    addSubscription: (subscription: { relayUrl: string; sub: any }) =>
      set((state) => ({
        subscriptions: [...state.subscriptions, subscription],
      })),
    removeSubscription: (subscription: { relayUrl: string; sub: any }) =>
      set((state) => ({
        subscriptions: state.subscriptions.filter((s) => s !== subscription),
      })),
    clearSubscriptions: () =>
      set((state) => {
        console.log('Clearing subscriptions')
        return {
          subscriptions: [],
        }
      }),
    hasSubscription: (relayUrl: string, sub: any) =>
      get().subscriptions.some((s) => s.relayUrl === relayUrl && s.sub === sub),
  },
})
