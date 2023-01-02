import create from 'zustand'
import { createAuth } from './auth'
import { createChat } from './chat'

export const useStore = create((set) => ({
  ...createAuth(set),
  ...createChat(set),
}))
