import BigInteger from 'bigi'
import { convert } from 'bip-schnorr'
import { Buffer } from 'buffer'
import ecurve from 'ecurve'

const curve = ecurve.getCurveByName('secp256k1')
const G = curve.G

/**
 * Get the public key from a private key.
 * We can't use noble/secp256k1 because the BigInt shim doesn't work on Android.
 * So we borrow point multiplication code from guggero's bip-schnorr library.
 */
export function getPublicKey(privateKey: Buffer) {
  const P = G.multiply(BigInteger.fromBuffer(privateKey))
  const Px = convert.intToBuffer(P.affineX)
  return Px.toString('hex')
}
