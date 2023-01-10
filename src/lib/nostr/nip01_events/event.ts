export enum Kind {
  Metadata = 0,
  Text = 1,
  RecommendRelay = 2,
  Contacts = 3,
  EncryptedDirectMessage = 4,
  EventDeletion = 5,
  Repost = 6,
  Reaction = 7,
  ChannelCreation = 40,
  ChannelMetadata = 41,
  ChannelMessage = 42,
  ChannelHideMessage = 43,
  ChannelMuteUser = 44,
}

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
