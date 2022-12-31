/**
 * NIP 06: Key derivation from mnemonic seed
 * https://github.com/nostr-protocol/nips/blob/master/06.md
 */

import { generateMnemonic } from 'bip39'

// https://docs.expo.dev/versions/latest/sdk/random/
import * as Random from 'expo-random'

export const createMnemonic = async () => {
  // @ts-expect-error (Buffer vs Uint8Array)
  return generateMnemonic(128, Random.getRandomBytes)
}
