import * as storage from 'app/lib/storage'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { createAuthStore } from './auth'
import { createChatStore } from './chat'
import { createRelayStore } from './relay'
import { createUiStore } from './ui'

export const useStore = create(
  persist(
    (set, get) => ({
      ...createAuthStore(set, get),
      ...createChatStore(set, get),
      ...createRelayStore(set, get),
      ...createUiStore(set),
    }),
    {
      name: 'arc-storage',
      getStorage: () => storage,
    }
  )
)
