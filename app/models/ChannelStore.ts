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
    createDefaultChannels() {
      const item1 = self.channels.findIndex(
        (el: any) => el.id === "8b28c7374ba5891ea65db9a2d1234ecc369755c35f6db1a54f18424500dea4a0",
      )
      if (item1 === -1) {
        self.channels.push({
          id: "8b28c7374ba5891ea65db9a2d1234ecc369755c35f6db1a54f18424500dea4a0",
          privkey: "",
        })
      }
      const item2 = self.channels.findIndex(
        (el: any) => el.id === "5b93e807c4bc055693be881f8cfe65b36d1f7e6d3b473ee58e8275216ff74393",
      )
      if (item2 === -1) {
        self.channels.push({
          id: "5b93e807c4bc055693be881f8cfe65b36d1f7e6d3b473ee58e8275216ff74393",
          privkey: "",
        })
      }
      const item3 = self.channels.findIndex(
        (el: any) => el.id === "3ff1f0a932e0a51f8a7d0241d5882f0b26c76de83f83c1b4c1efe42adadb27bd",
      )
      if (item3 === -1) {
        self.channels.push({
          id: "3ff1f0a932e0a51f8a7d0241d5882f0b26c76de83f83c1b4c1efe42adadb27bd",
          privkey: "",
        })
      }
    },
    create(meta: ChannelInfo) {
      const item = self.channels.findIndex((el: any) => el.id === meta.id)
      if (item === -1) {
        self.channels.push({
          id: meta.id,
          name: meta.name,
          picture: meta.picture,
          about: meta.about,
          privkey: meta.privkey,
        })
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ChannelStore extends Instance<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotOut extends SnapshotOut<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotIn extends SnapshotIn<typeof ChannelStoreModel> {}
export const createChannelStoreDefaultModel = () => types.optional(ChannelStoreModel, {})
