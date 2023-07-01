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
import {
  ArcadeIdentity,
  BlindedEvent,
  ChannelInfo,
  ChannelManager,
  NostrEvent,
  NostrPool,
  PrivateMessageManager,
} from "app/arclib/src"
import { ChannelModel } from "./Channel"
import { MessageModel } from "./Message"
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools"
import * as SecureStore from "expo-secure-store"
import * as storage from "../utils/storage"
import { ContactManager, Contact } from "app/arclib/src/contacts"
import { ContactModel } from "./Contact"
import { schnorr } from "@noble/curves/secp256k1"
import { sha256 } from "@noble/hashes/sha256"
import { bytesToHex } from "@noble/hashes/utils"
import { runInAction } from "mobx"

const utf8Encoder = new TextEncoder()

async function secureSet(key, value) {
  return await SecureStore.setItemAsync(key, value)
}
async function secureGet(key) {
  return await SecureStore.getItemAsync(key)
}
async function secureDel(key) {
  return await SecureStore.deleteItemAsync(key)
}

async function registerNip05(ident: ArcadeIdentity, name: string) {
  if (name.includes("@")) {
    // user should log in, not try to attach an existing nip05
    throw Error("Log in with your private key instead")
  }
  const ser = JSON.stringify([0, ident.pubKey, name])
  const hashB = sha256(utf8Encoder.encode(ser))
  const hashH = bytesToHex(hashB)
  const sig = bytesToHex(schnorr.sign(hashH, ident.privKey))
  const url = `https://uzxdj4za3vfn7czid274iwqvwq0kukze.lambda-url.us-east-2.on.aws/?name=${name}&pubkey=${ident.pubKey}&sig=${sig}`
  const response = await fetch(url)
  const js = await response.json()
  if (js.error) {
    throw new Error(js.error)
  }
  return `${name}@arcade.chat`
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
    contacts: types.optional(types.array(ContactModel), []),
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
    joinChannel(info: ChannelInfo) {
      const index = self.channels.findIndex((el: { id: string }) => el.id === info.id)
      if (index === -1) self.channels.push(ChannelModel.create(info))
    },
    leaveChannel(id: string) {
      const index = self.channels.findIndex((el: { id: string }) => el.id === id)
      if (index !== -1) self.channels.splice(index, 1)
    },
    async afterCreate() {
      const sec = await secureGet("privkey")
      if (sec) {
        const pubkey = await getPublicKey(sec)
        const meta = await storage.load("meta")
        runInAction(() => {
          self.setProp("privkey", sec)
          self.setProp("pubkey", pubkey)
          self.setProp("isLoggedIn", true)
          self.setProp("isNewUser", false)
          self.setProp("metadata", JSON.stringify(meta))
        })
      }
    },
    signup: flow(function* (username: string, displayName: string, about: string) {
      const privkey = generatePrivateKey()
      const pubkey = getPublicKey(privkey)
      const id = new ArcadeIdentity(privkey)
      const nip05 = yield registerNip05(id, username)
      const meta = { display_name: displayName, username, about, nip05 }
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
      yield secureSet("privkey", privkey)
      yield storage.save("meta", meta)
    }),
    loginWithNsec: flow(function* (nsec: string) {
      if (!nsec.startsWith("nsec1") || nsec.length < 60) {
        return
      }
      try {
        const { data } = nip19.decode(nsec)
        const privkey = data as string
        const pubkey = getPublicKey(privkey)

        self.setProp("pubkey", pubkey)
        self.setProp("privkey", privkey)
        yield secureSet("privkey", privkey)
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
    }),
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
    async fetchContacts(mgr: ContactManager) {
      if (!self.pubkey) throw new Error("pubkey not found")
      const res = await mgr.list()
      runInAction(() => {
        self.setProp("contacts", res)
      })
    },
    addContact: flow(function* (contact: Contact, mgr: ContactManager) {
      yield mgr.add(contact)
      const index = self.contacts.findIndex(
        (el: { pubkey: string }) => el.pubkey === contact.pubkey,
      )
      if (index === -1) {
        self.contacts.push(contact)
      } else {
        self.contacts[index].setProp("legacy", contact.legacy)
        self.contacts[index].setProp("secret", contact.secret)
      }
    }),
    removeContact: flow(function* (pubkey: string, mgr: ContactManager) {
      yield mgr.remove(pubkey)
      const index = self.contacts.findIndex((el: { pubkey: string }) => el.pubkey === pubkey)
      if (index !== -1) self.contacts.splice(index, 1)
    }),
    addRelay(url: string) {
      const index = self.relays.findIndex((el: string) => el === url)
      if (index === -1) self.relays.push(url)
    },
    removeRelay(url: string) {
      const index = self.relays.findIndex((el: string) => el === url)
      if (index !== -1) self.relays.splice(index, 1)
    },
    addPrivMessage(ev: BlindedEvent) {
      self.privMessages.push({
        ...ev,
        lastMessageAt: ev.created_at,
      })
    },
    updateChannels: flow(function* (pool: NostrPool) {
      const mgr = new ChannelManager(pool)
      const list = yield mgr.listChannels(true)
      list.forEach((ch) => {
        if (ch.is_private) {
          const idx = self.channels.findIndex((el) => el.id === ch.id)
          if (idx !== -1) {
            self.channels[idx].setProp("privkey", ch.privkey)
          }
        }
      })
    }),
    fetchPrivMessages: flow(function* (pool: NostrPool) {
      const priv = new PrivateMessageManager(pool)
      const keys = self.contacts.map((c) => c.pubkey)
      // this doesn't work... you get mobx errors
      // but we should be able to update the state!

      /*
      const modifyProp = async (ev: BlindedEvent) => {
        if (self.privMessages.every(msg=>{
            if (msg.pubkey === ev.pubkey) {
              console.log("modding", ev.pubkey)
              msg.setProp("content", ev.content)
              msg.setProp("blinded", ev.blinded)
              msg.setProp("lastMessageAt", ev.created_at)
              return false
            }
           return true
        })) {
          // append!
        }
      }
      */

      // this updates the home screen prop when new messages arrive
      // by passing in all our contact keys, we can decrypt new blinded messages
      const list = yield priv.list({ limit: 500 }, false, keys)
      const map = new Map<string, NostrEvent>()
      list.forEach((ev) => {
        const was = map.get(ev.pubkey)
        if (!was || ev.created_at > was.created_at) {
          map.set(ev.pubkey, ev)
        }
      })
      type ExtendedItem = NostrEvent & { lastMessageAt?: number; name?: string }
      const uniqueList: ExtendedItem[] = [...map.values()]
      for (const item of uniqueList) {
        item.lastMessageAt = item.created_at
      }
      self.privMessages = cast(uniqueList)
    }),
    clearNewUser() {
      self.setProp("isNewUser", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
