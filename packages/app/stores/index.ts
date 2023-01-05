import create from 'zustand'
import { createAuthStore } from './auth'
import { createChatStore } from './chat'
import { createRelayStore } from './relay'
import { createUiStore } from './ui'

export const useStore = create((set, get) => ({
  ...createAuthStore(set, get),
  ...createChatStore(set, get),
  ...createRelayStore(set, get),
  ...createUiStore(set),
}))
