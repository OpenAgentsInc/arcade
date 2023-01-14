import { useStore } from 'stores'

export const useUserMetadata = (pubkey: string) => {
  const users = useStore((state) => state.users).filter(
    (user) => user.pubkey === pubkey
  )
  return users[0]
}
