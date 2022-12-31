import { createMnemonic } from 'app/lib/createMnemonic'
import { AuthState, initialState } from './auth'

export const login = (name: string): AuthState => {
  const mnemonic = createMnemonic()
  console.log(mnemonic)
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
