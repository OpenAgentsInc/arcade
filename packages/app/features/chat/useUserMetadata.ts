import { useStore } from 'app/stores'

export const useUserMetadata = (pubkey: string) => {
  const userMetadata = useStore((s) => s.userMetadata)
  let metadata = null
  if (userMetadata.has(pubkey)) {
    metadata = userMetadata.get(pubkey)
  }
  return metadata
}
