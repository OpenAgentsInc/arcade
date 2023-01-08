export interface RelayState {
  relays: any[]
  subscriptions: any[]
}

const initialRelayState: RelayState = {
  relays: [],
  subscriptions: [],
}

export const createRelayStore = (set: any, get: any) => ({
  relays: initialRelayState.relays,
  subscriptions: initialRelayState.subscriptions,
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
    addSubscription: (subscription: { relayUrl: string; sub: any; channelId: string }) =>
      set((state) => {
        // Check if we already have a subscription for this relay and channel
        if (
          state.subscriptions.some(
            (s) => s.relayUrl === subscription.relayUrl && s.channelId === subscription.channelId
          )
        ) {
          return state
        }
        return {
          subscriptions: [...state.subscriptions, subscription],
        }
      }),
    removeSubscription: (subscription: { relayUrl: string; channelId: string }) =>
      set((state) => ({
        subscriptions: state.subscriptions.filter(
          (s) => s.relayUrl !== subscription.relayUrl || s.channelId !== subscription.channelId
        ),
      })),
    clearSubscriptions: () =>
      set((state) => {
        return {
          subscriptions: [],
        }
      }),
    hasSubscription: (relayUrl: string, channelId: string) => {
      const state = get()
      return state.subscriptions.some((s) => s.relayUrl === relayUrl && s.channelId === channelId)
    },
  },
})
