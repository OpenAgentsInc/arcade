import { display } from 'lib'
import { delay } from 'lib/delay'
import { generateRandomPlacekitten } from 'lib/placekitten'
import { RelayStore } from '../relay-store'

export const fetchUser = async (self: RelayStore, pubkey: string) => {
  display({
    name: 'fetchUser',
    preview: `Fetching user ${pubkey}`,
  })

  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received METADATA event from ${relay}, id ${event.id}`)
      display({
        name: 'fetchUser',
        preview: `Received METADATA event from ${relay}, id ${event.id}`,
        value: event,
      })
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }

      const metadataModel = self.rootStore.relay.userMetadata.get(event.pubkey)
      if (!metadataModel) {
        const content = JSON.parse(event.content)
        self.rootStore.relay.addUserMetadata({
          about: content.about ?? '',
          created_at: event.created_at,
          displayName: content.displayName ?? '',
          picture: content.picture ?? generateRandomPlacekitten(),
          pubkey: event.pubkey,
          username: content.username ?? '',
        })
      }
    } catch (e) {
      console.log('Error in onEvent')
      console.log(e)
    }
  }

  const sub = self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [0], authors: [pubkey] } })
  await delay(1000)
  sub.unsub()
}
