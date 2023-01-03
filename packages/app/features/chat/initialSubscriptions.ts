export const initialSubscriptions = [
  // Subscribe to the Nostr channel
  {
    kinds: [40],
    limit: 1,
    ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
  },
  // Subscribe to other channels
  { kinds: [40], limit: 50 },
  // Subscribe to messages and grab some
  { kinds: [42], limit: 15 },
]
