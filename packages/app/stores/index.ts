import { Nostr } from 'app/lib'
import create from 'zustand'
import { createAuthStore } from './auth'
import { createChatStore } from './chat'
import { createDatabaseStore } from './database'
import { createRelayStore } from './relay'
import { createUiStore } from './ui'

export const useStore = create((set, get) => ({
  nostr: new Nostr(),
  ...createAuthStore(set, get),
  ...createChatStore(set, get),
  ...createDatabaseStore(set, get),
  ...createRelayStore(set, get),
  ...createUiStore(set),
}))
