import { create } from 'zustand'
import { createAuthStore } from './auth'
import { createChatStore } from './chat'
import { createRelayStore } from './relay'
import { createUiStore } from './ui'

export type UseStore = object &
  ReturnType<typeof createAuthStore> &
  ReturnType<typeof createChatStore> &
  ReturnType<typeof createRelayStore> &
  ReturnType<typeof createUiStore>

export const useStore = create<UseStore>((set, get) => ({
  ...createAuthStore(set, get),
  ...createChatStore(set, get),
  ...createRelayStore(set, get),
  ...createUiStore(set),
}))
