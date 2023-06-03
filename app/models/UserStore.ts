import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { NostrPool } from "arclib/src"

// @ts-ignore
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    pubkey: "",
    privkey: "",
    contacts: types.optional(types.array(types.string), []),
    metadata: "",
    isLoggedIn: false,
    isNewUser: false,
    channels: types.optional(
      types.array(types.model({ id: types.string, privkey: types.string })),
      [
        { id: "1abf8948d2fd05dd1836b33b324dca65138b2e80c77b27eeeed4323246efba4d", privkey: "" }, // Arcade Open R&D
        { id: "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b", privkey: "" }, // Arcade Exchange
      ],
    ),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    joinChannel(id: string, privkey?: string) {
      self.channels.push({ id, privkey: privkey || "" })
    },
    leaveChannel(id: string) {
      const index = self.channels.findIndex((el: any) => el.id === id)
      if (index !== -1) self.channels.splice(index, 1)
    },
    async signup(username: string, displayName: string, about: string) {
      const privkey = generatePrivateKey()
      const pubkey = getPublicKey(privkey)

      applySnapshot(self, {
        pubkey,
        privkey,
        isLoggedIn: true,
        isNewUser: true,
        metadata: JSON.stringify({ display_name: displayName, username, about }),
      })
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
        self.setProp("isLoggedIn", true)
      } catch (e: any) {
        console.log(e)
        alert("Invalid key. Did you copy it correctly?")
      }
    },
    async logout() {
      console.log("log out...")
      applySnapshot(self, {
        pubkey: "",
        privkey: "",
        isLoggedIn: false,
        isNewUser: false,
        contacts: [],
      })
    },
    async fetchContacts(pool: NostrPool) {
      if (!self.pubkey) throw new Error("pubkey not found")

      const contacts = []
      const result: any = await pool.list([{ authors: [self.pubkey], kinds: [3] }], true)

      for (const item of result[0].tags) {
        contacts.push(item[1])
      }

      self.setProp("contacts", contacts)
    },
    clearNewUser() {
      self.setProp("isNewUser", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
