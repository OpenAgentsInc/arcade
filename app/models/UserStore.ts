import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools"
import { ArcadeIdentity, NostrPool } from "arclib"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    pubkey: "",
    privkey: "",
    payments: "bc1qxe584u98eu040mltfg0z2znndr5jq6a40l0np8",
    isLoggedIn: false,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async signup(username: string, displayName: string, about: string) {
      const privkey = generatePrivateKey()
      const pubkey = getPublicKey(privkey)
      const nsec = nip19.nsecEncode(privkey)

      self.setProp("pubkey", pubkey)
      self.setProp("privkey", privkey)
      self.setProp("isLoggedIn", true)

      // publish
      const ident = new ArcadeIdentity(nsec, "", "")
      const pool = new NostrPool(ident)
      await pool.setRelays(["wss://relay.damus.io"])
      await pool.send({
        content: JSON.stringify({ display_name: displayName, name: username, about }),
        tags: [],
        kind: 0,
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
      console.log("Logging out...")

      self.setProp("pubkey", "")
      self.setProp("privkey", "")
      self.setProp("isLoggedIn", false)

      console.log("Removed keys from storage.")
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
