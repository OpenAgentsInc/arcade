import { create } from 'zustand'

import { login, logout } from './authActions'

export interface AuthState {
  isLoggedIn: boolean
  user: {
    name: string
  }
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    name: '',
  },
}

const createAuth = (set: any) => ({
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: (name: string) => set(login(name)),
  logout: () => set(logout()),
})

export default createAuth
