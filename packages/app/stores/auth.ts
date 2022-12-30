import { create } from 'zustand'

import { login, logout } from './authActions'

interface AuthState {
  isLoggedIn: boolean
  user: {
    name: string
    email: string
  }
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    name: '',
    email: '',
  },
}

const createAuth = (set: any) => ({
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: (name: string, email: string) => set(login(name, email)),
  logout: () => set(logout()),
})

export default createAuth
