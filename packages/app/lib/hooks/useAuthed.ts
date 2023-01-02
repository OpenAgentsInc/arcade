import * as storage from 'app/lib/storage'
import { useStore } from 'app/stores'
import { useEffect } from 'react'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)

  const checkForKeys = async () => {
    const { publicKey, privateKey } = await storage.getKeys()
    if (!privateKey || !publicKey) return
    useStore.setState({ user: { privateKey, publicKey, name: 'Test Ostrich' } })
    console.log('Keys set from storage.')
  }

  useEffect(() => {
    checkForKeys()
  }, [])

  const authed = privateKey.length > 10 && publicKey.length > 10 // TODO: Sophisticate this
  return authed
}
