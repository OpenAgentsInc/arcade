import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ChannelStoreModel } from "./ChannelStore"
import { MessageStoreModel } from "./MessageStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  channelStore: types.optional(ChannelStoreModel, {} as any),
  messageStore: types.optional(MessageStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
