import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools"
import { NostrPool } from "arclib/src"

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
    channels: types.optional(types.array(types.string), [
      "1abf8948d2fd05dd1836b33b324dca65138b2e80c77b27eeeed4323246efba4d", // Arcade Open R&D
      "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b", // Arcade Exchange Test
    ]),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    joinChannel(id: string) {
      self.channels.push(id)
    },
    leaveChannel(id: string) {
      const index = self.channels.indexOf(id)
      if (index !== -1) {
        self.channels.splice(index, 1)
      }
    },
    async signup(username: string, displayName: string, about: string) {
      const privkey = generatePrivateKey()
      const pubkey = getPublicKey(privkey)

      self.setProp("pubkey", pubkey)
      self.setProp("privkey", privkey)
      self.setProp("isLoggedIn", true)
      self.setProp("isNewUser", true)
      self.setProp("metadata", JSON.stringify({display_name: displayName, username, about}))
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
      console.log("Logging out...")

      self.setProp("pubkey", "")
      self.setProp("privkey", "")
      self.setProp("isLoggedIn", false)

      console.log("Removed keys from storage.")
    },
    async fetchContacts(pool: NostrPool) {
      if (!self.pubkey) throw new Error("pubkey not found")
      
      const contacts = []
      const result: any = await pool.list([{ authors: [self.pubkey], kinds: [3] }], true)
      for (const item of result[0].tags) {
        contacts.push(item[1]);
      }
      
      self.setProp("contacts", contacts)
    },
    clearNewUser() {
      self.setProp("isNewUser", false)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
