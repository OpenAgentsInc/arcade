import { useStore } from 'stores'

export const useUserMetadata = (pubkey: string) => {
  const users = useStore((state) => state.users).filter(
    (user) => user.pubkey === pubkey
  )
  console.log(`user ${pubkey}`, users[0])
  return users[0]
}
