import { useState } from 'react'

export const useAuthed = () => {
  const [authed, setAuthed] = useState(false)
  const login = () => {
    console.log('setting authed...')
    setAuthed(true)
  }
  return { authed, login }
}
