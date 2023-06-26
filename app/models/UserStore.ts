import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { NostrPool } from "app/arclib/src"
import { ChannelModel } from "./Channel"
import { MessageModel } from "./Message"
import { generatePrivateKey, getPublicKey, nip04, nip19 } from "nostr-tools"
import * as SecureStore from "expo-secure-store"
import * as storage from "../utils/storage"
import { ContactManager, Contact } from "app/arclib/src/contacts"

async function secureSet(key, value) {
  return await SecureStore.setItemAsync(key, value)
}
async function secureGet(key) {
  return await SecureStore.getItemAsync(key)
}
async function secureDel(key) {
  return await SecureStore.deleteItemAsync(key)
}

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    pubkey: "",
    privkey: "",
    metadata: "",
    isLoggedIn: false,
    isNewUser: false,
    channels: types.array(types.reference(ChannelModel)),
    contacts: types.optional(
      types.array(
        types.model({ pubkey: types.string, secret: types.boolean, legacy: types.boolean }),
      ),
      [],
    ),
    privMessages: types.optional(types.array(MessageModel), []),
    relays: types.optional(types.array(types.string), [
      "wss://relay.arcade.city",
      "wss://arc1.arcadelabs.co",
      "wss://relay.damus.io",
    ]),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getChannels() {
      const list = self.channels.slice()
      return list
    },
    get getContacts() {
      return self.contacts.slice()
    },
    get getRelays() {
      return self.relays.slice()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    joinChannel(id: string) {
      const index = self.channels.findIndex((el: any) => el.id === id)
      if (index === -1) self.channels.push(id)
    },
    leaveChannel(id: string) {
      const index = self.channels.findIndex((el: any) => el.id === id)
      if (index !== -1) self.channels.splice(index, 1)
    },
    async afterCreate() {
      const sec = await secureGet("privkey")
      if (sec) {
        self.setProp("privkey", sec)
        const pubkey = await getPublicKey(sec)
        const meta = await storage.load("meta")
        self.setProp("pubkey", pubkey)
        self.setProp("isLoggedIn", true)
        self.setProp("isNewUser", false)
        self.setProp("metadata", JSON.stringify(meta))
      }
    },
    async signup(username: string, displayName: string, about: string) {
      const privkey = generatePrivateKey()
      const pubkey = getPublicKey(privkey)
      const meta = { display_name: displayName, username, about }
      applySnapshot(self, {
        pubkey,
        privkey,
        isLoggedIn: true,
        isNewUser: true,
        metadata: JSON.stringify(meta),
        channels: [
          "8b28c7374ba5891ea65db9a2d1234ecc369755c35f6db1a54f18424500dea4a0",
          "5b93e807c4bc055693be881f8cfe65b36d1f7e6d3b473ee58e8275216ff74393",
          "3ff1f0a932e0a51f8a7d0241d5882f0b26c76de83f83c1b4c1efe42adadb27bd",
        ],
      })
      await secureSet("privkey", privkey)
      await storage.save("meta", meta)
    },
    async loginWithNsec(nsec: string) {
      if (!nsec.startsWith("nsec1") || nsec.length < 60) {
        return
      }
      try {
        const { data } = nip19.decode(nsec)
        const privkey = data as string
        const pubkey = getPublicKey(privkey)

        self.setProp("pubkey", pubkey)
        self.setProp("privkey", privkey)
        await secureSet("privkey", privkey)
        self.setProp("isLoggedIn", true)
        self.setProp("channels", [
          "8b28c7374ba5891ea65db9a2d1234ecc369755c35f6db1a54f18424500dea4a0",
          "5b93e807c4bc055693be881f8cfe65b36d1f7e6d3b473ee58e8275216ff74393",
          "3ff1f0a932e0a51f8a7d0241d5882f0b26c76de83f83c1b4c1efe42adadb27bd",
        ])
      } catch (e: any) {
        console.log(e)
        alert("Invalid key. Did you copy it correctly?")
      }
    },
    async logout() {
      await secureDel("privkey")
      applySnapshot(self, {
        pubkey: "",
        privkey: "",
        isLoggedIn: false,
        isNewUser: false,
        channels: [],
        contacts: [],
      })
    },
    async fetchContacts(mgr: ContactManager): Promise<Contact[]> {
      if (!self.pubkey) throw new Error("pubkey not found")
      const res = await mgr.list()
      self.setProp("contacts", res)
      return res
    },
    async addContact(contact: Contact, mgr: ContactManager) {
      await mgr.add(contact)
      self.setProp("contacts", await mgr.list())
    },
    async removeContact(pubkey: string, mgr: ContactManager) {
      await mgr.remove(pubkey)
      self.contacts.replace(mgr.curList())
    },
    addRelay(url: string) {
      const index = self.relays.findIndex((el: any) => el === url)
      if (index === -1) self.relays.push(url)
    },
    removeRelay(url: string) {
      const index = self.relays.findIndex((el: any) => el === url)
      if (index !== -1) self.relays.splice(index, 1)
    },
    async fetchPrivMessages(pool: NostrPool) {
      const list = await pool.list([{ kinds: [4], "#p": [self.pubkey] }], true)
      const uniqueList = [...new Map(list.map((item) => [item.pubkey, item])).values()]
      for (const item of uniqueList) {
        item.content = await nip04.decrypt(self.privkey, item.pubkey, item.content)
        // @ts-ignore
        item.lastMessageAt = item.created_at
      }
      self.setProp("privMessages", uniqueList)
    },
    clearNewUser() {
      self.setProp("isNewUser", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
