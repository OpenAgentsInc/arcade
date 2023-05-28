import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MessageStoreModel } from "./MessageStore"

/**
 * Model description here for TypeScript hints.
 */
export const ChannelStoreModel = types
  .model("ChannelStore")
  .props({
    messages: types.array(MessageStoreModel),
    join: types.array(types.reference(MessageStoreModel)),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get allMessages() {
      return self.messages.slice()
    },
    get listing() {
      return self.messages.filter((m) => m.tags.find((t) => t[0] === "x" && t[1] === "listing"))
    },
    get sortedAndIgnoreOffers() {
      const filterOffers = self.messages.filter((m) => m.tags.find((t) => t[1] !== "offer"))
      const sorted = filterOffers.slice().sort((a, b) => b.created_at - a.created_at)
      return sorted
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchMessages(channel: any, id: string) {
      const events = await channel.list(id, true)
      self.setProp("messages", events)
    },
    addMessage(event: any) {
      self.messages.unshift(event)
    },
    reset() {
      applySnapshot(self, { messages: [] })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ChannelStore extends Instance<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotOut extends SnapshotOut<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotIn extends SnapshotIn<typeof ChannelStoreModel> {}
export const createChannelStoreDefaultModel = () => types.optional(ChannelStoreModel, {})
