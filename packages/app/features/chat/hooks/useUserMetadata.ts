import { useStore } from 'stores/index'

export const useUserMetadata = (pubkey: string) => {
  const userMetadata = useStore((s) => s.userMetadata)
  let metadata: any = null
  if (userMetadata.has(pubkey)) {
    metadata = userMetadata.get(pubkey)
  }
  return metadata
}
