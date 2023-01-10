import { Kind } from 'nostr-tools'

export type Event = {
  id?: string
  sig?: string
  kind: Kind
  tags: string[][]
  pubkey: string
  content: string
  created_at: number
}

export type NostrEvent = Event

export type SignedEvent = Event & { id: string; sig: string }
