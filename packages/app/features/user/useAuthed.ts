import * as storage from 'app/lib/storage'
import { useNostr } from 'app/lib/useNostr'
import { useStore } from 'app/stores'
import { useEffect, useState } from 'react'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const nostr = useNostr()
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
    nostr.setKeys(publicKey, privateKey)
    setCheckedForKeys(true)
  }

  useEffect(() => {
    checkForKeys()
  }, [])

  console.log('Returning authed: ', authed)
  return authed
}
