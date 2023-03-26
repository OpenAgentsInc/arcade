import { generatePrivateKey, getPublicKey } from 'nostr-tools'

export const saveZap = async ({ eventId, lud16 }) => {
  const privateKey = generatePrivateKey()
  const publicKey = getPublicKey(privateKey)

  console.log(`Sending zap to ${lud16} for ${eventId} from ${publicKey}`)
}
