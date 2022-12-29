import { applySnapshot, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from '../_extensions'
import * as actions from './user-actions'

export const UserStoreModel = types
  .model('UserStore')
  .props({
    about: types.maybe(types.string),
    authed: types.optional(types.boolean, false),
    displayName: types.maybe(types.string),
    mnemonic: types.maybe(types.string),
    privateKey: types.maybe(types.string),
    publicKey: types.maybe(types.string),
    username: types.maybe(types.string),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    createKeypair: async (): Promise<void> => await actions.createKeypair(self as UserStore),
    login: async (text: string): Promise<boolean> => await actions.login(self as UserStore, text),
    logout: async (): Promise<void> => await actions.logout(self as UserStore),
    signup: async (props: actions.SignupProps): Promise<boolean> =>
      await actions.signup(self as UserStore, props),
    setAbout(about: string) {
      self.about = about
    },
    setAuthed(authed: boolean) {
      self.authed = authed
    },
    setDisplayName(displayName: string) {
      self.displayName = displayName
    },
    setMnemonic(mnemonic: string) {
      self.mnemonic = mnemonic
    },
    setPrivateKey(privateKey: string) {
      self.privateKey = privateKey
    },
    setPublicKey(publicKey: string) {
      self.publicKey = publicKey
    },
    setUsername(username: string) {
      self.username = username
    },
    reset() {
      applySnapshot(self, {})
    },
  }))
  .views((self) => ({
    get isAuthed(): boolean {
      return !!self.authed
    },
    get isOnboarded(): boolean {
      return !!self.privateKey && !!self.username
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
