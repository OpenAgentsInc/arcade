import { Kind } from 'nostr-tools'

import { bech32Decode } from '../nostr/bech32'
import { parseHexstr, parseNostrRefUri } from '../nostr/NostrLink'
import { consumeUntil, parseChar, Parser } from '../util/parser'
import { parsePostTextBlock, PostBlock } from './postblock'

export type MentionType = {
  ref: string
}

type ReferencedId = {
  refId: string
  relayId: string | null
  key: string
}

export interface NostrPost {
  kind: Kind
  content: string
  references: ReferencedId[]
}

export const parsePostMentionType = (p: string): MentionType | null => {
  if (p[0] === '@') {
    return { ref: 'pubkey' }
  }

  if (p[0] === '&') {
    return { ref: 'event' }
  }

  return null
}

export const parsePostReference = (p: string): ReferencedId | null => {
  //   const start = p.pos

  const typ = parsePostMentionType(p)
  if (typ) {
    const ref = parsePostMention(p, typ)
    if (ref) {
      return ref
    }
  }

  return parseNostrRefUri(p)
}

const isBech32Char = (c: string): boolean => {
  return 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'.includes(c)
}

export const parsePostMention = (
  p: string,
  mentionType: MentionType
): ReferencedId | null => {
  const hexId = parseHexstr(p, 64)
  if (hexId) {
    return { refId: hexId, relayId: null, key: mentionType.ref }
  }

  const bech32Ref = parsePostBech32Mention(p)
  if (bech32Ref) {
    return bech32Ref
  }

  return null
}

function parsePostBech32Mention(p: Parser): ReferencedId | null {
  const start = p.pos
  let hrp = ''
  if (p.str.startsWith('note', p.pos)) {
    hrp = 'note'
  } else if (p.str.startsWith('npub', p.pos)) {
    hrp = 'npub'
  } else if (p.str.startsWith('nsec', p.pos)) {
    hrp = 'nsec'
  } else {
    return null
  }

  if (!parseChar(p, '1')) {
    p.pos = start
    return null
  }

  if (!consumeUntil(p, (c) => !isBech32Char(c), true)) {
    return null
  }

  const end = p.pos
  const sliced = p.str.slice(start, end)

  try {
    const decoded = bech32Decode(sliced)
    const hex = hexEncode(decoded.data)

    switch (decoded.hrp) {
      case 'note':
        return { refId: hex, relayId: null, key: 'e' }

      case 'npub':
        return { refId: hex, relayId: null, key: 'p' }

      case 'nsec':
        const pubkey = privkeyToPubkey(hex)
        if (pubkey) {
          return { refId: pubkey, relayId: null, key: 'p' }
        } else {
          p.pos = start
          return null
        }

      default:
        p.pos = start
        return null
    }
  } catch (e) {
    p.pos = start
    return null
  }
}

/**
 * Return a list of tags
 */
// function parsePostBlocks(content: string): PostBlock[] {
//   const p = new Parser(content)
//   const blocks: PostBlock[] = []

//   while (!p.eof()) {
//     let block: PostBlock | null = parsePostTag(p)
//     if (!block) {
//       block = parsePostTextBlock(p)
//     }

//     if (block) {
//       blocks.push(block)
//     }
//   }

//   return blocks
// }

function parsePostTag(p: Parser): PostBlock | null {
  const start = p.pos
  if (!parseChar(p, '#')) {
    return null
  }

  if (
    !consumeUntil(
      p,
      (c) => c === ' ' || c === '\n' || c === '\r' || p.eof(),
      true
    )
  ) {
    p.pos = start
    return null
  }

  const end = p.pos
  const tag = p.str.slice(start + 1, end)
  return { type: 'tag', tag }
}

// function parsePostTextBlock(p: Parser): PostBlock {
//   const start = p.pos

//   if (consumeUntil(p, (c) => !isMentionChar(c), true)) {
//     return {
//       kind: 'text',
//       content: String.substring(p.str, start, p.pos),
//     }
//   } else {
//     p.pos = start
//     return null
//   }
// }

function parsePostMentionBlock(p: Parser, mentionType: MentionType): PostBlock {
  const start = p.pos
  const id = parseHexstr(p, 64)
  const bech32Ref = parsePostBech32Mention(p)

  if (id || bech32Ref) {
    let ref: ReferencedId
    if (id) {
      ref = { refId: id, relayId: null, key: mentionType.ref }
    } else {
      ref = bech32Ref
    }

    return {
      kind: 'reference',
      ref,
    }
  } else {
    p.pos = start
    return null
  }
}

function parsePostHashtagBlock(p: Parser): PostBlock {
  const start = p.pos

  if (parseChar(p, '#')) {
    if (consumeUntil(p, (c) => !isMentionChar(c), true)) {
      return {
        kind: 'hashtag',
        content: String.substring(p.str, start + 1, p.pos),
      }
    }
  }

  p.pos = start
  return null
}

function parsePostBlock(p: Parser): PostBlock {
  const start = p.pos
  const mentionType = parsePostMentionType(p)
  if (mentionType) {
    return parsePostMentionBlock(p, mentionType)
  } else if (parseChar(p, '#')) {
    return parsePostHashtagBlock(p)
  } else {
    return parsePostTextBlock(p)
  }
}

export function parsePostBlocks(content: string): PostBlock[] {
  const p = new Parser(0, content)
  const blocks: PostBlock[] = []
  while (!p.done()) {
    const block = parsePostTextBlock(p.str, p.pos, p.str.length)
    if (block) {
      blocks.push(block)
    } else {
      break
    }
    p.pos += 1
  }
  return blocks
}
