import schnorr from 'bip-schnorr'
import { Buffer } from 'buffer'
import createHash from 'create-hash/browser'

export const formatNotice = (message: string) => JSON.stringify(['NOTICE', message])

export const formatEvent = (event: object) => JSON.stringify(['EVENT', event])

export enum NostrKind {
  metadata = 0,
  text = 1,
  contacts = 3,
  dm = 4,
  delete = 5,
  boost = 6,
  like = 7,
  channelcreate = 40,
  channelmetadata = 41,
  channelmessage = 42,
  riderequest = 60,
}

/**
 * "The only object type that exists is the event, which has the following format on the wire:"
 */
export interface NostrEvent {
  // <32-bytes sha256 of the the serialized event data>
  id: string
  // <32-bytes hex-encoded public key of the event creator>
  pubkey: string
  // <unix timestamp in seconds>
  created_at: number
  // <integer> (representing the kind of event)
  kind: NostrKind
  /**
   * ["e", <32-bytes hex of the id of another event>, <recommended relay URL>],
   * ["p", <32-bytes hex of the key>, <recommended relay URL>],
   * ... // other kinds of tags may be included later
   */
  tags: string[][]
  // <arbitrary string>
  content: string
  // <64-bytes signature of the sha256 hash of the serialized event data, which is the same as the "id" field>
  sig: string
}

export interface NostrEventToSerialize {
  content: string
  created_at: number
  kind: NostrKind
  pubkey: string
  tags: string[][]
}

export interface NostrEventToSign {
  id: string
  content: string
  created_at: number
  kind: NostrKind
  pubkey: string
  tags: string[][]
}

export interface Filters {
  // A list of event ids or prefixes
  ids?: string[]
  // A list of pubkeys or prefixes, the pubkey of an event must be one of these
  authors?: string[]
  // A list of kind numbers
  kinds?: number[]
  // A list of event ids that are referenced in an 'e' tag
  '#e'?: string[]
  // A list of pubkeys that are referenced in a 'p' tag
  '#p'?: string[]
  // A timestamp, events must be newer than this to pass
  since?: number
  // A timestamp, events must be older than this to pass
  until?: number
  // Maximum number of events to be returned in the initial query
  limit?: number
}

export const getEventHash = (event: NostrEventToSerialize) => {
  let eventHash = createHash('sha256')
    .update(Buffer.from(serializeEvent(event)))
    .digest()
  return Buffer.from(eventHash).toString('hex')
}

export const serializeEvent = (event: NostrEventToSerialize) => {
  return JSON.stringify([0, event.pubkey, event.created_at, event.kind, event.tags, event.content])
}

export const signEvent = async (event: NostrEventToSign, key: string) => {
  const eventHash = getEventHash(event)
  const eventBuffer = Buffer.from(eventHash, 'hex')
  return Buffer.from(await schnorr.sign(key, eventBuffer)).toString('hex')
}

export const normalizeEvent = (event: any) =>
  ({
    id: event.nid,
    pubkey: event.pubkey,
    created_at: event.created_at,
    kind: event.kind,
    tags: event.tags ?? [],
    content: event.content,
    sig: event.sig,
  } as NostrEvent)
