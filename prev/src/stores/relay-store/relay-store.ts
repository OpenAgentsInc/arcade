import { isArrayInArray } from 'lib/isArrayInArray'
import { values } from 'mobx'
import { applySnapshot, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from '../_extensions'
import * as actions from './relay-actions'
import { Event, EventModel, UserMetadata, UserMetadataModel } from './relay-models'

export const RelayStoreModel = types
  .model('RelayStore')
  .props({
    events: types.optional(types.map(EventModel), {}),
    userMetadata: types.optional(types.map(UserMetadataModel), {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    /** Check that we have metadata for all users we have events for - now requiring a channelId */
    checkAllUserMetadata: async (channelId: string): Promise<void> =>
      await actions.checkAllUserMetadata(self as RelayStore, channelId),
    /** Connect to Nostr relays */
    connect: async (): Promise<void> => await actions.connect(self as RelayStore),
    /** Fetch recent text posts from global feed */
    fetchFeedPosts: async (): Promise<void> => await actions.fetchFeedPosts(self as RelayStore),
    /** Fetch messages for a given channelId */
    fetchMessages: async (channelId: string, actuallyFetch: boolean): Promise<void> =>
      await actions.fetchMessages(self as RelayStore, channelId, actuallyFetch),
    /** Fetch user metadata for a given pubkey */
    fetchUser: async (pubkey: string): Promise<void> =>
      await actions.fetchUser(self as RelayStore, pubkey),
    /** Send a message to channel */
    sendChannelMessage: async (channelId: string, text: string): Promise<void> =>
      await actions.sendChannelMessage(self as RelayStore, channelId, text),
    /** Save event to store */
    addEvent: (event: Event) => {
      self.events.set(event.id, event)
    },
    /** Save user metadata to store */
    addUserMetadata: (metadata: UserMetadata) => {
      console.log('attempting to save:', metadata)
      self.userMetadata.set(metadata.pubkey, metadata)
    },
    /** Reset this store to original state */
    reset() {
      applySnapshot(self, {})
    },
  }))
  .views((self) => ({
    /** Get event by id */
    getEventById(id: string) {
      return self.events.get(id)
    },
    /** Get metadata for user */
    getUserMetadata(pubkey: string) {
      const events = values(self.events) as any
      const metadataEvents = events
        .filter((event: Event) => event.kind === 0)
        .filter((event: Event) => event.pubkey === pubkey)
        .sort((a: Event, b: Event) => b.created_at - a.created_at)

      if (metadataEvents.length === 0) {
        // self.fetchUser(pubkey)
        return null
      }
      const latest = metadataEvents[0]
      const content = JSON.parse(latest.content) as any
      return {
        about: content.about ?? '',
        displayName: content.displayName ?? '',
        picture: content.picture ?? '',
        username: content.name,
      }
    },
    /** Return channels as list of normalized events with kind 40 */
    get feedevents() {
      const events = values(self.events) as any
      return events.filter((event: Event) => event.kind === 1)
    },
    /** Return channels as list of normalized events with kind 40 */
    get channels() {
      const events = values(self.events) as any
      return events
        .filter(
          (event: Event) =>
            event.pubkey === '72e40635ef243ce4937b0083593af773d35487b3b5147f47d4d62576e97cd2f9'
        )
        .filter((event: Event) => event.created_at >= 1660780018)
        .filter((event: Event) => event.kind === 40)
        .map((event: Event) => {
          const channelInfo = JSON.parse(event.content)
          const { about, name, picture } = channelInfo
          return {
            ...event,
            name,
            about,
            picture,
          }
        })
    },
    /** Return messages for channel */
    getMessagesForChannel(channelId: string) {
      const events = values(self.events) as any
      return (
        events
          .filter((event: Event) => event.kind === 42)
          .filter(
            (event: Event) =>
              isArrayInArray(['e', channelId], event.tags) ||
              isArrayInArray(['#e', channelId], event.tags)
          )
          // .filter((event: Event) => isArrayInArray(['#e', channelId], event.tags))

          // .map((event: Event) => {
          //   const messageInfo = JSON.parse(event.content)
          //   const { message, sender } = messageInfo
          //   return {
          //     ...event,
          //     message,
          //     sender,
          //   }
          // })
          .sort((a: Event, b: Event) => a.created_at - b.created_at)
      )
    },
  }))

type RelayStoreType = Instance<typeof RelayStoreModel>
export interface RelayStore extends RelayStoreType {}
type RelayStoreSnapshotType = SnapshotOut<typeof RelayStoreModel>
export interface RelayStoreSnapshot extends RelayStoreSnapshotType {}
export const createRelayStoreDefaultModel = () => types.optional(RelayStoreModel, {})
