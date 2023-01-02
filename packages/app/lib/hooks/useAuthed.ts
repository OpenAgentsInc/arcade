import * as storage from 'app/lib/storage'
import { useStore } from 'app/stores'
import { useEffect, useState } from 'react'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const [checkedForKeys, setCheckedForKeys] = useState<boolean>(false)
  const [authed, setAuthed] = useState<boolean | null>(null) // null is dunno yet (loading). false is no. true is yes.

  const checkForKeys = async () => {
    const { publicKey, privateKey } = await storage.getKeys()
    setCheckedForKeys(true)
    if (!privateKey || !publicKey) {
      console.log('No keys found')
      setAuthed(false)
      return
    }
    useStore.setState({ user: { privateKey, publicKey, name: 'Test Ostrich' } })
    console.log('Keys set from storage.')
    setAuthed(true)
  }

  useEffect(() => {
    checkForKeys()
  }, [])

  //   const authed = privateKey.length > 10 && publicKey.length > 10 // TODO: Sophisticate this

  return authed
}
