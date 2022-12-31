import create from 'zustand'
import createAuth from './auth'

export const useStore = create((set) => ({
  ...createAuth(set),
}))
