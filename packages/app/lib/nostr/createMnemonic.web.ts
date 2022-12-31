/**
 * NIP 06: Key derivation from mnemonic seed
 * https://github.com/nostr-protocol/nips/blob/master/06.md
 */

// https://github.com/expo/expo/issues/7996#issuecomment-708483392
import 'setimmediate'
if (!global.setImmediate) {
  // @ts-expect-error
  global.setImmediate = setTimeout
}

export const createMnemonic = async () => {
  if (typeof window === 'undefined') return ''

  // @ts-expect-error - irrelevant tsc dynamic import error
  const getRandomBytes = (await import('expo-random')).getRandomBytes
  // @ts-expect-error - irrelevant tsc dynamic import error
  const generateMnemonic = (await import('bip39')).generateMnemonic

  // @ts-expect-error (Buffer vs Uint8Array)
  return generateMnemonic(128, getRandomBytes)
}
