import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const MessageStoreModel = types
  .model("MessageStore")
  .props({
    id: "",
    pubkey: "",
    content: "",
    tags: types.optional(types.array(types.array(types.string)), []),
    created_at: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Message extends Instance<typeof MessageStoreModel> {}
export interface MessageSnapshotOut extends SnapshotOut<typeof MessageStoreModel> {}
export interface MessageSnapshotIn extends SnapshotIn<typeof MessageStoreModel> {}
export const createMessageDefaultModel = () => types.optional(MessageStoreModel, {})
