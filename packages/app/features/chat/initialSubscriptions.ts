export const initialSubscriptions = [
  // Subscribe to the Nostr channel
  {
    kinds: [40],
    limit: 1,
    ids: ['25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb'],
  },
  // Subscribe to 10 other channels
  { kinds: [40], limit: 10 },
  // Subscribe to messages and grab 35
  { kinds: [42], limit: 35 },
]
