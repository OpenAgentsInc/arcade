import { Parser } from '../util/parser'

type ReferencedId = {
  refId: string
  relayId: string | null
  key: string
}

export type NostrLink = {
  type: string
  value: ReferencedId | NostrFilter
}

export const encodePubkeyUri = (ref: ReferencedId): string => {
  return `p:${ref.refId}`
}

export const encodeEventIdUri = (ref: ReferencedId): string => {
  return `e:${ref.refId}`
}

export const parseNostrRefUriType = (p: string): string | null => {
  if (p[0] === 'p') {
    return 'p'
  }

  if (p[0] === 'e') {
    return 'e'
  }

  return null
}

export const parseHexstr = (p: string, len: number): string | null => {
  let i = 0

  if (len % 2 !== 0) {
    return null
  }

  const start = p.pos

  while (i < len) {
    if (!parseHexChar(p)) {
      p.pos = start
      return null
    }
    i += 1
  }

  return p.substring(start, p.pos)
}

export const parseNostrRefUri = (p: string): ReferencedId | null => {
  const start = p.pos

  if (!parseStr(p, 'nostr:')) {
    return null
  }

  const typ = parseNostrRefUriType(p)
  if (!typ) {
    p.pos = start
    return null
  }

  if (!parseChar(p, ':')) {
    p.pos = start
    return null
  }

  const pk = parseHexstr(p, 64)
  if (!pk) {
    p.pos = start
    return null
  }

  return { refId: pk, relayId: null, key: typ }
}

export const decodeUniversalLink = (s: string): NostrLink | null => {
  let uri = s.replace('https://damus.io/r/', '')
  uri = uri.replace('https://damus.io/', '')
  uri = uri.replace('/', '')

  const decoded = bech32Decode(uri)
  if (!decoded) {
    return null
  }

  const h = hexEncode(decoded.data)

  if (decoded.hrp === 'note') {
    return { type: 'ref', value: { refId: h, relayId: null, key: 'e' } }
  } else if (decoded.hrp === 'npub') {
    return { type: 'ref', value: { refId: h, relayId: null, key: 'p' } }
  }
  // TODO: handle nprofile, etc

  return null
}

export function decodeNostrUri(s: string): NostrLink | null {
  if (s.startsWith('https://damus.io/')) {
    return decodeUniversalLink(s)
  }

  const uri = s.replace('nostr://', '').replace('nostr:', '')

  const parts = uri.split(':').reduce<string[]>((acc, str) => {
    const decoded = str.removingPercentEncoding
    if (decoded) {
      acc.push(decoded)
    }
    return acc
  }, [])

  if (parts.length === 0) {
    return null
  }

  switch (parts[0]) {
    case 'ref':
      const p = new Parser(0, parts[1])
      return NostrLink.ref(parseNostrRefUri(p))
    case 'filter':
      return NostrLink.filter(decodeNostrFilter(parts[1]))
    default:
      return null
  }
}
