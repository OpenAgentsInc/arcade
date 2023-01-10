import { Nostr } from 'lib/nostr'
import create from 'zustand'

import { createAuthStore } from './auth'
import { createChatStore } from './chat'
import { createRelayStore } from './relay'
import { createUiStore } from './ui'

type UseStore = {
  nostr: Nostr | undefined
} & ReturnType<typeof createAuthStore> &
  ReturnType<typeof createChatStore> &
  ReturnType<typeof createRelayStore> &
  ReturnType<typeof createUiStore>

export const useStore = create<UseStore>((set, get) => ({
  nostr: undefined, // new Nostr(),
  ...createAuthStore(set, get),
  ...createChatStore(set, get),
  ...createRelayStore(set, get),
  ...createUiStore(set),
}))
