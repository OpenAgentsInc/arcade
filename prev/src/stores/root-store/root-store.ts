import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { RelayStoreModel } from 'stores/relay-store/relay-store'
import { UserStoreModel } from 'stores/user-store/user-store'

export const RootStoreModel = types.model('RootStore').props({
  relay: types.optional(RelayStoreModel, {} as any),
  user: types.optional(UserStoreModel, {} as any),
})

type RootStoreType = Instance<typeof RootStoreModel>
export interface RootStore extends RootStoreType {}
type RootStoreSnapshotType = SnapshotOut<typeof RootStoreModel>
export interface RootStoreSnapshot extends RootStoreSnapshotType {}
export const createRootStoreDefaultModel = () => types.optional(RootStoreModel, {})
