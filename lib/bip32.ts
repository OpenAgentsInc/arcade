// import { Buffer } from 'buffer'
// if (!global.Buffer) {
//   global.Buffer = Buffer
// }

// @ts-ignore
import * as ecc from 'tiny-secp256k1-v1/js.js'

import BIP32Factory from 'bip32'

export const bip32 = BIP32Factory(ecc)
