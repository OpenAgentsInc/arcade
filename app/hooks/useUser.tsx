import React, { createContext, useContext } from "react"

import { useAnonUser } from "./useAnonUser"

export const UserContext = createContext<{
  userId: string | boolean | null
  loading: string | boolean | null
}>({
  userId: null,
  loading: true,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, loading] = useAnonUser()
  return <UserContext.Provider value={{ userId, loading }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
