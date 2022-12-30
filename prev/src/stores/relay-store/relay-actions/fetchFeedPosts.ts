import { RelayStore } from '../relay-store'

export const fetchFeedPosts = async (self: RelayStore) => {
  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received post event from ${relay}, id ${event.id}`)
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }
    } catch (e) {
      console.log('Error in onEvent')
    }
  }

  // And some feed posts - if we don't have any
  if (self.feedevents.length === 0) {
    self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [1], limit: 20 } })
  } else {
    console.log('Skipping feedevents sub')
  }
}
