import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { NostrPool } from "app/arclib/src"
import { ChannelModel } from "./Channel"
import { arrayToNIP02 } from "app/utils/nip02"
import * as SecureStore from "expo-secure-store"
import * as storage from "../utils/storage"

// @ts-ignore
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools"

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
    contacts: types.optional(types.array(types.string), []),
    relays: types.optional(types.array(types.string), [
      "wss://relay.arcade.city",
      "wss://arc1.arcadelabs.co",
      "wss://relay.damus.io",
    ]),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getChannels() {
      const list = self.channels.slice().sort((a, b) => b.lastMessageAt - a.lastMessageAt)
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
        const meta = storage.load("meta")
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
          "1abf8948d2fd05dd1836b33b324dca65138b2e80c77b27eeeed4323246efba4d",
          "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b",
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
          "1abf8948d2fd05dd1836b33b324dca65138b2e80c77b27eeeed4323246efba4d",
          "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b",
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
    async fetchContacts(pool: NostrPool) {
      if (!self.pubkey) throw new Error("pubkey not found")

      const contacts: string[] = []
      const result: any = await pool.list([{ authors: [self.pubkey], kinds: [3] }])
      const latest = result.slice(-1)[0]

      if (latest) {
        for (const item of latest.tags) {
          contacts.push(item[1])
        }

        self.setProp("contacts", contacts)
      }
    },
    addContact(pubkey: string, pool: NostrPool) {
      const index = self.contacts.findIndex((el: any) => el === pubkey)
      if (index === -1) {
        self.contacts.push(pubkey)

        const newFollows = [...self.contacts, pubkey]
        const nip02 = arrayToNIP02(newFollows)

        pool.send({
          content: "",
          tags: nip02,
          kind: 3,
        })
      }
    },
    removeContact(pubkey: string, pool: NostrPool) {
      const index = self.contacts.findIndex((el: any) => el === pubkey)
      if (index !== -1) {
        self.contacts.splice(index, 1)
        const nip02 = arrayToNIP02(self.contacts)

        pool.send({
          content: "",
          tags: nip02,
          kind: 3,
        })
      }
    },
    addRelay(url: string) {
      const index = self.relays.findIndex((el: any) => el === url)
      if (index === -1) self.relays.push(url)
    },
    removeRelay(url: string) {
      const index = self.relays.findIndex((el: any) => el === url)
      if (index !== -1) self.relays.splice(index, 1)
    },
    clearNewUser() {
      self.setProp("isNewUser", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
