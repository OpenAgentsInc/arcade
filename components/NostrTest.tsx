import { relayInit } from 'nostr-tools'
import { useEffect } from 'react'

export const NostrTest = () => {
  const connect = async () => {
    const relay = relayInit('wss://relay.damus.io')

    await relay.connect()
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })

    let sub = relay.sub([
      {
        kinds: [1],
        limit: 50,
      },
    ])

    sub.on('event', (event) => {
      console.log('got event:', event)
    })
  }

  useEffect(() => {
    console.log('NostrTest')
    connect()
  }, [])
  return <></>
}
