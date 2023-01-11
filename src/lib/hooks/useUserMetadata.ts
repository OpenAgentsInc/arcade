import { useStore } from 'stores'

import { Kind } from '../nostr'

export const useUserMetadata = (pubkey: string) => {
  const events = useStore((s) => s.events)

  try {
    const latestMetadata = events
      // where pubkey is pubkey
      .filter((e) => e.pubkey === pubkey)
      // where kind is Kind.UserMetadata
      .filter((e) => e.kind === Kind.Metadata)
      // and grab only the most recent one
      .sort((a, b) => b.created_at - a.created_at)
      .slice(0, 1)

    const metadata = latestMetadata[0]
    return JSON.parse(metadata.content)
  } catch (e) {
    console.log('Error getting user metadata', e)
    return null
  }
}
