import { display } from 'lib'
import { delay } from 'lib/delay'
import { isArrayInArray } from 'lib/isArrayInArray'
import { NostrKind } from 'lib/nostr'
import { values } from 'mobx'
import { Event } from '../relay-models'
import { RelayStore } from '../relay-store'

// a horribly non-optimized way to fetch user metadata for the events we got
// Adding to it a parameter to only fetch for a particular channel at a time
export const checkAllUserMetadata = async (self: RelayStore, channelId: string) => {
  const events = values(self.events) as any

  // First build an array of unique pubkeys from the kinds we care about - for now just channelmessage
  const filteredEvents = events
    .filter((event: Event) => event.kind === NostrKind.channelmessage)
    .filter(
      (event: Event) =>
        isArrayInArray(['e', channelId], event.tags) ||
        isArrayInArray(['#e', channelId], event.tags)
    )
  const pubkeys = filteredEvents.map((event: Event) => event.pubkey)
  const uniquePubkeys: string[] = Array.from(new Set(pubkeys))

  display({
    name: 'checkAllUserMetadata',
    preview: `Checking ${events.length} events (${filteredEvents.length} filtered) for user metadata`,
    value: { pubkeys, uniquePubkeys },
  })

  // Now fetch metadata for each pubkey
  for (const pubkey of uniquePubkeys) {
    if (self.userMetadata.has(pubkey)) {
      console.log(`Already have metadata for ${pubkey}`)
      continue
    } else {
      console.log(`Fetching metadata for ${pubkey}`)
      await delay(250)
      self.fetchUser(pubkey)
    }
  }
}
