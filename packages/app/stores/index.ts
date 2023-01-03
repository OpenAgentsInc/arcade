import create from 'zustand'
import { createAuthStore } from './auth'
import { createChatStore } from './chat'
import { createRelayStore } from './relay'

export const useStore = create((set, get) => ({
  ...createAuthStore(set),
  ...createChatStore(set, get),
  ...createRelayStore(set, get),
}))
