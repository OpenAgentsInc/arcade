import { ChannelManager } from "app/arclib/src"
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MessageModel } from "./Message"

/**
 * Model description here for TypeScript hints.
 */
export const ChannelModel = types
  .model("Channel")
  .props({
    id: types.identifier,
    name: types.optional(types.string, ""),
    picture: types.optional(types.string, ""),
    about: types.optional(types.string, ""),
    privkey: types.optional(types.string, ""),
    lastMessage: types.optional(types.string, ""),
    lastMessageAt: types.optional(types.number, Math.floor(Date.now() / 1000)),
    messages: types.optional(types.array(MessageModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get allMessages() {
      return self.messages.slice().sort((a, b) => b.created_at - a.created_at)
    },
    get listing() {
      return self.messages.filter((m) => m.tags.find((t) => t[0] === "x" && t[1] === "listing"))
    },
  }))
  .actions((self) => ({
    async fetchMessages(channel: ChannelManager) {
      const events = await channel.list({
        channel_id: self.id,
        filter: { since: Math.floor(Date.now() / 1000) - 24 * 3600 },
        db_only: true,
        privkey: self.privkey,
      })
      self.setProp("messages", events)
    },
    async fetchMeta(channel: ChannelManager) {
      const result = await channel.getMeta(self.id, self.privkey)
      if (result) {
        self.setProp("name", result.name)
        self.setProp("picture", result.picture)
        self.setProp("about", result.about)
      } else {
        alert("Failed to fetch meta")
      }
    },
    addMessage(event: any) {
      self.messages.unshift(event)
    },
    updateLastMessage(content: string, time: number) {
      self.setProp("lastMessage", content)
      self.setProp("lastMessageAt", time)
    },
    reset() {
      applySnapshot(self, { ...self, messages: [] })
    },
  }))

export interface Channel extends Instance<typeof ChannelModel> {}
export interface ChannelSnapshotOut extends SnapshotOut<typeof ChannelModel> {}
export interface ChannelSnapshotIn extends SnapshotIn<typeof ChannelModel> {}
export const createChannelDefaultModel = () => types.optional(ChannelModel, {})
