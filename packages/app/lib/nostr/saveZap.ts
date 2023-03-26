import { generatePrivateKey, getPublicKey } from 'nostr-tools'

export const saveZap = async ({ eventId }) => {
  const privateKey = generatePrivateKey()
  const publicKey = getPublicKey(privateKey)

  console.log(`Sending zap to ${eventId} from ${publicKey}`)
}
