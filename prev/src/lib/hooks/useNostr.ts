import { useEffect } from 'react'
import { useStores } from 'stores/root-store'

export const useNostr = () => {
  const { relay, user } = useStores()
  useEffect(() => {
    if (!user.authed) return
    relay.connect()
    relay.fetchUser(user.publicKey as string)
  }, [user.authed])
}
