import { useEffect, useState } from 'react'
import { Button, Paragraph, ScrollView, YStack } from '@my/ui'
import {
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
  SimplePool,
} from 'nostr-tools'
import { getParams } from 'js-lnurl'
import { Zap } from '@tamagui/lucide-icons'

const relays = [
  'wss://relay.damus.io',
  'wss://arc1.arcadelabs.co',
  'wss://relay.snort.social',
]

export function ZapScreen() {
  const [userAccounts, setUserAccounts] = useState<any>([])

  const zapUser = async (account, targetNoteId, userPubkey, userRelays) => {
    console.log('lets zap', account)

    const amount = 16000

    // Step 1: Parse the metadata field
    const metadata = JSON.parse(account.metadata)

    // Calculate the lnurl pay request url for a user
    const paymentUrl = await getLnurlPayRequestUrl(
      metadata.lud06 ? metadata.lud06 : metadata.lud16
      //   metadata.lud16 ? metadata.lud16 : metadata.lud06
    )

    console.log('checking paymentUrl:', paymentUrl)

    if (!paymentUrl) {
      console.error('No payment URL found in the metadata.')
      return
    }

    // Step 2: Fetch the lnurl pay request static endpoint
    // Step 2: Fetch the lnurl pay request static endpoint with the amount parameter
    const response = await fetch(`${paymentUrl}?amount=${amount}`)
    const lnurlPayRequest = await response.json()
    console.log('lnurlPayRequest:', lnurlPayRequest)
    // const response = await fetch(paymentUrl)
    // const lnurlPayRequest = await response.json()
    // console.log('lnurlPayRequest:', lnurlPayRequest)

    if (lnurlPayRequest.allowsNostr && lnurlPayRequest.nostrPubkey) {
      // Step 3: Display a lightning zap button and generate a zap invoice
      const zapRequestNote = createZapRequestNote(
        undefined,
        lnurlPayRequest.nostrPubkey,
        userRelays,
        targetNoteId,
        'Zap to ' + metadata.name + ' from Arc',
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

  const getLnurlPayRequestUrl = async (ludValue) => {
    if (ludValue.startsWith('lnurl1') || ludValue.startsWith('LNURL1')) {
      // LUD-06 format
      try {
        const params = (await getParams(ludValue)) as any
        console.log(params)
        if (params.status === 'ERROR') {
          alert(`Error: ${params.reason}`)
          return null
        }
        if (params.tag === 'payRequest') {
          return params.callback
        } else {
          console.error('Invalid LUD-06 tag:', params.tag)
          return null
        }
      } catch (err) {
        console.error('Error processing LUD-06:', err)
        return null
      }
    } else {
      // LUD-16 format
      const [username, domain] = ludValue.split('@')
      const protocol = domain.endsWith('.onion') ? 'http' : 'https'
      return `${protocol}://${domain}/.well-known/lnurlp/${username}`
    }
  }

  const createZapRequestNote = (
    senderPrivateKey,
    recipientPubkey,
    relays,
    targetNoteId,
    comment,
    amount
  ) => {
    console.log('trying to ok hmm')
    try {
      if (!senderPrivateKey) senderPrivateKey = generatePrivateKey()
      console.log('???')
    } catch (e) {
      console.error(e)
    }

    console.log('senderPrivateKey:', senderPrivateKey)

    const senderPubkey = getPublicKey(senderPrivateKey)
    console.log('senderPubkey:', senderPubkey)

    const zapRequestNote = {
      id: '',
      pubkey: senderPubkey,
      created_at: Math.floor(Date.now() / 1000),
      kind: 9734,
      tags: [
        ['p', recipientPubkey],
        ['relays', ...relays],
      ],
      content: comment,
    }

    console.log('zapRequestNote:', zapRequestNote)

    if (targetNoteId) {
      zapRequestNote.tags.push(['e', targetNoteId])
    }

    if (amount) {
      zapRequestNote.tags.push(['amount', amount.toString()])
    }

    // Generate the note ID and sign the note
    zapRequestNote.id = getEventHash(zapRequestNote)

    zapRequestNote.sig = signEvent(zapRequestNote, senderPrivateKey)

    return zapRequestNote
  }

  const fetchZaps = async () => {
    const pool = new SimplePool()

    // Fetch events with kind 9735 (zaps)
    const events = await pool.list(relays, [
      {
        kinds: [9735],
        // since 2 minutes ago
        since: Math.floor(Date.now() / 1000) - 60 * 1,
      },
    ])

    // console.log(events)
    console.log(`Got ${events.length} zaps`)

    const zaps = events.map((event) => {
      return {
        id: event.id,
        pubkey: event.pubkey,
        metadata: event.content,
        tags: JSON.stringify(event.tags),
      }
    })

    // Do something with the fetched zaps
    // console.log('Fetched zaps:', zaps)
    // for each zap, console log with a line break
    zaps.forEach((zap) => {
      console.log('zap:', zap)
    })
  }

  const fetchUserAccounts = async () => {
    if (userAccounts.length > 0) return
    const pool = new SimplePool()

    const events = await pool.list(relays, [{ kinds: [0] }])
    console.log(`Got ${events.length} events`)
    const userAccounts2 = events
      .filter((event: any) => {
        try {
          const filter =
            JSON.parse(event.content).lud06 || JSON.parse(event.content).lud16
          return filter
        } catch (e) {
          return false
        }
      })
      .map((event) => {
        return {
          id: event.id,
          pubkey: event.pubkey,
          metadata: event.content,
        }
      })

    setUserAccounts(userAccounts2)
  }

  useEffect(() => {
    fetchZaps()
    fetchUserAccounts()
  }, [])
  return (
    <ScrollView f={1}>
      <YStack f={1} jc="center" ai="center" p="$4" mt="$8" space>
        {userAccounts.map((account: any) => {
          return (
            <YStack key={account.id}>
              <Paragraph ta="center">
                {JSON.parse(account.metadata)?.name || 'unnamed'}
              </Paragraph>
              <Paragraph ta="center">
                {JSON.parse(account.metadata)?.lud06 || 'no lud06'}
              </Paragraph>
              <Paragraph ta="center">
                {JSON.parse(account.metadata)?.lud16 || 'no lud16'}
              </Paragraph>

              <Button
                onPress={() => zapUser(account, null, account.pubkey, relays)}
                bg="$orange10Dark"
                color="white"
                fontWeight="700"
              >
                <Zap size={24} color="white" />
                Zap {JSON.parse(account.metadata).name || account.pubkey}
              </Button>
            </YStack>
          )
        })}
      </YStack>
    </ScrollView>
  )
}
