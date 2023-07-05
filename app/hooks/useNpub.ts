import { useStores } from "app/models"
import { nip19 } from "nostr-tools"

export function useNpub() {
  const { userStore } = useStores()
  const npub = nip19.npubEncode(userStore.pubkey)
  return npub
}
