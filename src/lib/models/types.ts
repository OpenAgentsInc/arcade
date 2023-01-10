export enum Kind {
  Metadata = 0,
  Text = 1,
  RecommendRelay = 2,
  Contacts = 3,
  EncryptedDirectMessage = 4,
  EventDeletion = 5,
  Reaction = 7,
  ChannelCreation = 40,
  ChannelMetadata = 41,
  ChannelMessage = 42,
  ChannelHideMessage = 43,
  ChannelMuteUser = 44,
}

export interface NostrEventInterface {
  id: string
  kind: Kind
  timestamp: Date
  content: string
  tags: string[][]
  blocks: Block[]
  references: ReferencedId[]
}

export class NostrEvent implements NostrEventInterface {
  constructor(
    public id: string,
    public kind: Kind,
    public timestamp: Date,
    public content: string,
    public tags: string[][],
    public blocks: Block[],
    public references: ReferencedId[]
  ) {}
}

export interface Block {
  kind: 'mention' | 'hashtag' | 'text'
  mention?: Mention
  hashtag?: string
  text?: string
}

export interface Mention {
  index: number
  type: MentionType
  ref: ReferencedId
}

export enum MentionType {
  Event = 'event',
  Pubkey = 'pubkey',
}

export interface NostrPost {
  kind: PostKind
  content: string
  references: ReferencedId[]
}

export enum PostKind {
  TextPost = 1,
  ImagePost = 2,
  AudioPost = 3,
}

export interface PostTags {
  blocks: Block[]
  tags: string[][]
}

export interface ReferencedId {
  key: string
  refId: string
  relayId: string | null
}
