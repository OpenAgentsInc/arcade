import { Kind } from 'nostr-tools'

export type NostrEvent = {
  id?: string
  sig?: string
  kind: Kind
  tags: string[][]
  pubkey: string
  content: string
  created_at: number
}
