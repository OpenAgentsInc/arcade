import { bech32 } from 'bech32'
import { Buffer } from 'buffer'

export const hexToNpub = (hex: string) => {
  return bech32.encode('npub', bech32.toWords(Buffer.from(hex, 'hex')))
}

export const hexToNsec = (hex: string) => {
  return bech32.encode('nsec', bech32.toWords(Buffer.from(hex, 'hex')))
}

export const bech32Decode = (s: string) => {
  try {
    return bech32.decode(s)
  } catch (e) {
    return null
  }
}

// https://damus.io/key/key.js?v=3
function hex_char(val) {
  if (val < 10) return String.fromCharCode(48 + val)
  if (val < 16) return String.fromCharCode(97 + val - 10)
}

function hex_encode(buf) {
  let str = ''
  for (let i = 0; i < buf.length; i++) {
    const c = buf[i]
    str += hex_char(c >> 4)
    str += hex_char(c & 0xf)
  }
  return str
}

export const bechToHex = (bech) => {
  const decoded = bech32Decode(bech)
  if (!decoded) return ''
  const bytes = bech32.fromWords(decoded.words)
  return hex_encode(bytes)
}
