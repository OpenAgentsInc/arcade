import { initialState } from './auth'

export const login = (name: string, email: string) => (state: any) => {
  return {
    isLoggedIn: true,
    user: {
      name,
      email,
    },
  }
}

export const logout = () => (state: any) => {
  return initialState
}
