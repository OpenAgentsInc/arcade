import { Instance, SnapshotIn, SnapshotOut, types, resolveIdentifier } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ChannelModel } from "./Channel"
import { ChannelInfo } from "app/arclib/src"

/**
 * Model description here for TypeScript hints.
 */
export const ChannelStoreModel = types
  .model("ChannelStore")
  .props({
    channels: types.array(ChannelModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getChannel(id: string) {
      return resolveIdentifier(ChannelModel, self, id)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    create(meta: ChannelInfo) {
      const item = self.channels.findIndex((el: any) => el.id === meta.id)
      if (item === -1) {
        self.channels.push({
          id: meta.id,
          name: meta.name,
          picture: meta.picture,
          about: meta.about,
          privkey: meta.privkey,
          lastMessageAt: Math.floor(Date.now() / 1000),
          is_private: meta.is_private,
        })
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ChannelStore extends Instance<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotOut extends SnapshotOut<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotIn extends SnapshotIn<typeof ChannelStoreModel> {}
export const createChannelStoreDefaultModel = () => types.optional(ChannelStoreModel, {})
