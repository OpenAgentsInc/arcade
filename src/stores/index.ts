import create from 'zustand'

import { createIapStore } from './iap'
import { createUiStore } from './ui'

type UseStore = object &
  ReturnType<typeof createIapStore> &
  ReturnType<typeof createUiStore>

export const useStore = create<UseStore>((set, get) => ({
  ...createIapStore(set),
  ...createUiStore(set),
}))
