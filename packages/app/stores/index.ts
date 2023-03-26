import create from 'zustand'

import { createAuthStore } from './auth'
import { createUiStore } from './ui'

export type UseStore = object &
  ReturnType<typeof createAuthStore> &
  ReturnType<typeof createUiStore>

export const useStore = create<UseStore>((set, get) => ({
  ...createAuthStore(set, get),
  ...createUiStore(set),
}))
