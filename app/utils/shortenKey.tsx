import { nip19 } from "nostr-tools"

export function shortenKey(pubkey: string) {
  try {
    const npub = nip19.npubEncode(pubkey)
    return npub.substring(0, 12).concat("...")
  } catch (e) {
    return "invalid:".concat(pubkey.substring(0, 7))
  }
}
