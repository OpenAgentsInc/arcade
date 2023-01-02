import { login, logout } from './authActions'

export interface AuthState {
  isLoggedIn: boolean
  user: {
    name: string
    publicKey: string
    privateKey: string
  }
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    name: '',
    publicKey: '',
    privateKey: '',
  },
}

const createAuth = (set: any) => ({
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: async (name: string) => set(await login(name)),
  logout: async () => set(await logout()),
})

export default createAuth
