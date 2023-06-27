import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const MessageModel = types
  .model("Message")
  .props({
    id: types.identifier,
    pubkey: types.string,
    content: types.string,
    sig: types.optional(types.string, ""),
    tags: types.optional(types.array(types.array(types.string)), []),
    created_at: types.optional(types.number, Math.floor(Date.now() / 1000)),
    kind: types.maybe(types.number),
    hide: types.optional(types.boolean, false),
    mute: types.optional(types.boolean, false),
    lastMessageAt: types.maybe(types.number),
    blinded: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Message extends Instance<typeof MessageModel> {}
export interface MessageSnapshotOut extends SnapshotOut<typeof MessageModel> {}
export interface MessageSnapshotIn extends SnapshotIn<typeof MessageModel> {}
export const createMessageDefaultModel = () => types.optional(MessageModel, {})
