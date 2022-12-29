import { display } from 'lib'
import { RelayStore } from '../relay-store'

export const fetchMessages = async (
  self: RelayStore,
  channelId: string,
  actuallyFetch: boolean
) => {
  display({
    name: 'fetchMessages',
    preview: `Fetching messages for channel ${channelId}`,
  })

  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received  event from ${relay}, id ${event.id}`)
      display({
        name: 'fetchUser',
        preview: `Received event from ${relay}, id ${event.id}`,
        value: event,
      })
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }
    } catch (e) {
      console.log('Error in onEvent')
      console.log(e)
    }
  }

  self.env.nostr.pool.sub({
    cb: onEvent,
    filter: { kinds: [42], '#e': [channelId], limit: actuallyFetch ? 75 : 2 },
  })
}
