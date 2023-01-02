import * as storage from 'app/lib/storage'
import { useStore } from 'app/stores'
import { useEffect, useState } from 'react'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const [checkedForKeys, setCheckedForKeys] = useState<boolean>(false)
  //   const [authed, setAuthed] = useState<boolean | null>(null) // null is dunno yet (loading). false is no. true is yes.
  const authed = checkedForKeys ? publicKey.length > 10 && privateKey.length > 10 : null

  useEffect(() => {
    console.log(authed)
  }, [authed])

  useEffect(() => {
    if (checkedForKeys && privateKey && publicKey) {
      console.log('Keys found')
      //   setAuthed(true)
      return
    }
    if (checkedForKeys && (!privateKey || !publicKey)) {
      console.log('No keys found')
      //   setAuthed(false)
      return
    }
  }, [privateKey, publicKey, checkedForKeys])

  const checkForKeys = async () => {
    const { publicKey, privateKey } = await storage.getKeys()

    if (!privateKey || !publicKey) {
      console.log('No keys found')
      //   setAuthed(false)
      setCheckedForKeys(true)
      return
    }
    useStore.setState({ user: { privateKey, publicKey, name: 'Test Ostrich' } })
    console.log('Keys set from storage.')
    // setAuthed(true)
    setCheckedForKeys(true)
  }

  useEffect(() => {
    checkForKeys()
  }, [])

  return authed
}
