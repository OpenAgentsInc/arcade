import { AuthState, initialState } from './auth'

export const login = (name: string): AuthState => {
  return {
    isLoggedIn: true,
    user: {
      name,
    },
  }
}

export const logout = (): AuthState => {
  return initialState
}
