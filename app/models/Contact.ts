import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ContactModel = types
  .model("Contact")
  .props({
    pubkey: types.string,
    secret: types.boolean,
    legacy: types.boolean,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Contact extends Instance<typeof ContactModel> {}
export interface ContactSnapshotOut extends SnapshotOut<typeof ContactModel> {}
export interface ContactSnapshotIn extends SnapshotIn<typeof ContactModel> {}
export const createContactDefaultModel = () => types.optional(ContactModel, {})
