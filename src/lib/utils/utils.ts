import * as secp from '@noble/secp256k1'
import { bech32 } from 'bech32'
import { formatDistanceToNow } from 'date-fns'

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const formatTimestamp = (timestamp: string) => {
  // eslint-disable-next-line radix
  const timestampNum = parseInt(timestamp)
  const date = new Date(timestampNum * 1000)
  const formattedTimestamp = formatDistanceToNow(date, { addSuffix: true })
  return formattedTimestamp
}

export const generateRandomPlacekitten = () => {
  const width = Math.floor(Math.random() * (220 - 200 + 1)) + 200
  const height = Math.floor(Math.random() * (320 - 300 + 1)) + 300
  return `https://placekitten.com/${width}/${height}`
}

export function isValidImageUrl(url: string): boolean {
  // TODO: this needs work
  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  if (urlRegex.test(url)) {
    // console.log('VALID:', url)
    return true
  } else {
    // console.log('INVALID:', url)
    return false
  }
}

export const truncateString = (string: string, maxLength: number) => {
  if (string.length <= maxLength) {
    return string
  }
  return `${string.substring(0, maxLength)}...`
}

/**
 * Parse bech32 ids
 * https://github.com/nostr-protocol/nips/blob/master/19.md
 */
export function parseId(id: string) {
  const hrp = ['note', 'npub', 'nsec']
  try {
    if (hrp.some((a) => id.startsWith(a))) {
      return bech32ToHex(id)
    }
  } catch (e) {}
  return id
}

export function bech32ToHex(str: string) {
  const nKey = bech32.decode(str)
  const buff = bech32.fromWords(nKey.words)
  return secp.utils.bytesToHex(Uint8Array.from(buff))
}

/**
 * Convert hex to bech32
 */
export function hexToBech32(hrp: 'note' | 'npub' | 'nsec', hex: string) {
  if (typeof hex !== 'string' || hex.length === 0 || hex.length % 2 !== 0) {
    return ''
  }

  try {
    const buf = secp.utils.hexToBytes(hex)
    return bech32.encode(hrp, bech32.toWords(buf))
  } catch (e) {
    console.warn('Invalid hex', hex, e)
    return ''
  }
}

export function getLastETagId(tags: string[][]) {
  let lastETag = ''

  tags.forEach((tag) => {
    if (tag[0] === 'e') {
      lastETag = tag[1]
    }
  })

  return lastETag
}
