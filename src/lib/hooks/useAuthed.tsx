import React, { createContext, useContext, useState } from 'react'

// Create the AuthContext
const AuthContext = createContext<{
  authed: boolean
  login: () => void
}>({
  authed: false,
  login: () => {},
})

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false)
  const login = () => {
    console.log('setting authed...')
    setAuthed(true)
  }
  return (
    <AuthContext.Provider value={{ authed, login }}>
      {children}
    </AuthContext.Provider>
  )
}

// useAuthed hook
export const useAuthed = () => {
  return useContext(AuthContext)
}
