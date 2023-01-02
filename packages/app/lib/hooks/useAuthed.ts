import * as storage from 'app/lib/storage'
import { useStore } from 'app/stores'
import { useEffect, useState } from 'react'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const [checkedForKeys, setCheckedForKeys] = useState<boolean>(false)
  const authed = checkedForKeys ? publicKey.length > 10 && privateKey.length > 10 : null

  useEffect(() => {
    if (checkedForKeys && privateKey && publicKey) {
      console.log(`You are ${publicKey}`)
      return
    }
    if (checkedForKeys && (!privateKey || !publicKey)) {
      console.log('No keys found')
      return
    }
  }, [privateKey, publicKey, checkedForKeys])

  const checkForKeys = async () => {
    const { publicKey, privateKey } = await storage.getKeys()

    if (!privateKey || !publicKey) {
      setCheckedForKeys(true)
      return
    }
    useStore.setState({ user: { privateKey, publicKey, name: 'Test Ostrich' } })
    setCheckedForKeys(true)
  }

  useEffect(() => {
    checkForKeys()
  }, [])

  return authed
}
