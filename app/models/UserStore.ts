import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
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
        { id: "57a5a14ed061ebfdb559a53689dc5f17df2820d6d63d642502ed9d1c25cfcd85", privkey: "" }, // Arcade Open R&D
        { id: "96e6e41921f530c9bf380db5e56ba0b7f02ffd9dd1c8aa052f7c60163be392e2", privkey: "" }, // Arcade Exchange
        {
          id: "49bd604b86cd143e211a513c140f05157775c9d53d2a676a9f370160404450d3",
          privkey: "12ac825a570264bf8b246a858f2a80cc068102004b4358942591d9c0119bbf22",
        }, // Arcade Encrypted
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

      self.setProp("pubkey", pubkey)
      self.setProp("privkey", privkey)
      self.setProp("isLoggedIn", true)
      self.setProp("isNewUser", true)
      self.setProp("metadata", JSON.stringify({ display_name: displayName, username, about }))
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
