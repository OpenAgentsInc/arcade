import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { createZapRequestNote, getLnurlPayRequestUrl } from 'app/lib/nostr'

const userRelays = [
  'wss://relay.damus.io',
  'wss://arc1.arcadelabs.co',
  'wss://relay.snort.social',
]

export const saveZap = async ({ eventId, lud16 }) => {
  const privateKey = generatePrivateKey()
  const publicKey = getPublicKey(privateKey)

  console.log(`Sending zap to ${lud16} for ${eventId} from ${publicKey}`)

  const amount = 21000
  const paymentUrl = await getLnurlPayRequestUrl(lud16)
  console.log('Using:', paymentUrl)
  const response = await fetch(`${paymentUrl}?amount=${amount}`)
  const lnurlPayRequest = await response.json()
  console.log('lnurlPayRequest:', lnurlPayRequest)

  if (lnurlPayRequest.allowsNostr && lnurlPayRequest.nostrPubkey) {
    // Step 3: Display a lightning zap button and generate a zap invoice
    const zapRequestNote = createZapRequestNote(
      undefined,
      lnurlPayRequest.nostrPubkey,
      userRelays,
      eventId,
      'Test Zap from Arc',
      // userPubkey,
      amount // The milli-satoshi amount value
    )

    console.log(zapRequestNote)

    const zapInvoiceUrl = `${
      lnurlPayRequest.callback
    }?amount=${amount}&nostr=${encodeURIComponent(
      JSON.stringify(zapRequestNote)
    )}`

    console.log('zapInvoiceUrl:', zapInvoiceUrl)

    // Step 4: Get the zap invoice
    const invoiceResponse = await fetch(zapInvoiceUrl)
    const invoiceData = await invoiceResponse.json()
    console.log('invoiceData:', invoiceData)

    if (invoiceData.pr) {
      // Step 5: Pay the invoice or pass it to an app that can pay the invoice
      console.log('Invoice:', invoiceData.pr)
      // Here, you should pay the invoice or pass it to an app that can handle the payment
    } else {
      console.error('Error fetching invoice:', invoiceData)
    }
  } else {
    console.error('Nostr is not supported or nostrPubkey is invalid.')
  }
}
