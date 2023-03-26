import * as storage from 'lib/storage'
import { useEffect, useState } from 'react'
import { useStore } from 'stores'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const apiToken = useStore((s) => s.apiToken)

  const [checkedForKeys, setCheckedForKeys] = useState<boolean>(false)
  const authed = checkedForKeys
    ? publicKey.length > 10 && privateKey.length > 10 //&&
    : //   !!apiToken &&
      //   apiToken.length > 10
      null

  useEffect(() => {
    if (checkedForKeys && privateKey && publicKey && apiToken) {
      //   console.log(`You are ${publicKey}`)
      return
    }
    if (checkedForKeys && (!privateKey || !publicKey)) {
      console.log('No keys found')
    }
  }, [privateKey, publicKey, checkedForKeys])

  const checkForKeys = async () => {
    const { apiToken, publicKey, privateKey } = await storage.getKeys()
    console.log('checked for keys and found:', {
      apiToken,
      publicKey,
      privateKey,
    })

    if (!privateKey || !publicKey) {
      setCheckedForKeys(true)
      return
    }

    useStore.setState({ apiToken, user: { privateKey, publicKey } })
    setCheckedForKeys(true)
  }

  useEffect(() => {
    checkForKeys()
  }, [])

  return authed
}
