import { ChannelManager, NostrEvent, NostrPool } from "app/arclib/src"
import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
  cast,
  flow,
  types,
} from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MessageModel } from "./Message"
import { QueryClient } from "@tanstack/react-query"

/**
 * Model description here for TypeScript hints.
 */
export const ChannelModel = types
  .model("Channel")
  .props({
    id: types.identifier,
    name: types.optional(types.string, ""),
    picture: types.union(types.null, types.optional(types.string, "")),
    about: types.optional(types.string, ""),
    is_private: types.optional(types.boolean, false),
    privkey: types.optional(types.string, ""),
    lastMessage: types.optional(types.string, ""),
    lastMessagePubkey: types.optional(types.string, ""),
    lastMessageAt: types.optional(types.number, Math.floor(Date.now() / 1000)),
    loading: types.optional(types.boolean, true),
    db: types.optional(types.boolean, false),
    memberList: types.optional(types.array(types.string), []),
    messages: types.optional(types.array(MessageModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get allMessages() {
      return self.messages.slice().sort((a, b) => b.created_at - a.created_at)
    },
    get members() {
      return self.memberList.slice()
    },
    get listing() {
      return self.messages.filter((m) => m.tags.find((t) => t[0] === "x" && t[1] === "listing"))
    },
  }))
  .actions((self) => ({
    handleNewMessage: flow(function* (event: NostrEvent) {
      if (self.messages.find((msg) => msg.id === event.id)) return
      self.messages = cast([event, ...self.messages])
    }),
  }))
  .actions((self) => ({
    fetchMessages: flow(function* (
      queryClient: QueryClient,
      pool: NostrPool,
      channel: ChannelManager,
    ) {
      const nHoursAgo = (hrs: number): number =>
        Math.floor((Date.now() - hrs * 60 * 60 * 1000) / 1000)

      const events = yield channel.list({
        channel_id: self.id,
        filter: { since: nHoursAgo(72) },
        db_only: self.db,
        privkey: self.privkey,
        callback: self.handleNewMessage,
      })

      // batch fetch user's metadata
      const authors = [...new Set(events.map((ev: NostrEvent) => ev.pubkey))] as string[]
      const meta: NostrEvent[] = yield pool.list([{ authors, kinds: [0] }], self.db)
      meta.forEach((user) => {
        queryClient.setQueryData(["user", user.pubkey], JSON.parse(user.content))
      })

      // we need make sure event's content is string (some client allow content as number, ex: coracle)
      // but this function maybe hurt performance
      events.forEach((event: NostrEvent) => {
        if (typeof event.content !== "string") event.content = String(event.content)
      })

      const uniqueEvents = events.filter(
        (obj: NostrEvent, index: number) =>
          events.findIndex((item: NostrEvent) => item.id === obj.id) === index,
      )

      self.setProp("loading", false)
      self.setProp("db", true)
      self.messages = cast(uniqueEvents)
    }),
    updateLastMessage() {
      const lastMessage = self.messages.sort((a, b) => b.created_at - a.created_at)[0]
      if (lastMessage) {
        self.setProp("lastMessage", lastMessage.content)
        self.setProp("lastMessagePubkey", lastMessage.pubkey)
        self.setProp("lastMessageAt", lastMessage.created_at)
      }
    },
    fetchMeta: flow(function* (channel: ChannelManager) {
      const result = yield channel.getMeta(self.id, self.privkey, true)
      if (result) {
        self.setProp("name", result.name)
        self.setProp("picture", result.picture)
        self.setProp("about", result.about)
      } else {
        console.log("Failed to fetch meta")
      }
    }),
    addMembers(list: string[]) {
      self.setProp("memberList", list)
    },
    reset() {
      applySnapshot(self, { ...self, loading: true, messages: [] })
    },
  }))

export interface Channel extends Instance<typeof ChannelModel> {}
export interface ChannelSnapshotOut extends SnapshotOut<typeof ChannelModel> {}
export interface ChannelSnapshotIn extends SnapshotIn<typeof ChannelModel> {}
export const createChannelDefaultModel = () => types.optional(ChannelModel, {})
