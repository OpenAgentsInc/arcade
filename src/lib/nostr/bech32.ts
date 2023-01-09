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
