import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { getLnurlPayRequestUrl } from 'app/lib/nostr'

export const saveZap = async ({ eventId, lud16 }) => {
  const privateKey = generatePrivateKey()
  const publicKey = getPublicKey(privateKey)

  console.log(`Sending zap to ${lud16} for ${eventId} from ${publicKey}`)

  const amount = 20000
  const paymentUrl = await getLnurlPayRequestUrl(lud16)
  console.log('Using:', paymentUrl)
  const response = await fetch(`${paymentUrl}?amount=${amount}`)
  const lnurlPayRequest = await response.json()
  console.log('lnurlPayRequest:', lnurlPayRequest)
}
