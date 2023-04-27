import { create } from 'zustand'
import { createAuthStore } from './auth'
import { createRelayStore } from './relay'
import { createUiStore } from './ui'

export type UseStore = object &
  ReturnType<typeof createAuthStore> &
  ReturnType<typeof createRelayStore> &
  ReturnType<typeof createUiStore>

export const useStore = create<UseStore>((set, get) => ({
  ...createAuthStore(set, get),
  ...createRelayStore(set, get),
  ...createUiStore(set),
}))
