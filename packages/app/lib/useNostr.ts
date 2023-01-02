import { relayInit } from 'nostr-tools'
import { useRef } from 'react'

export const useNostr = () => {
  const relayRef = useRef<any>()
  const connect = async () => {
    if (!relayRef.current) {
      relayRef.current = relayInit('wss://relay.nostr.ch')
      await relayRef.current.connect()
      relayRef.current.on('connect', () => {
        console.log(`connected to ${relayRef.current.url}`)
      })
      relayRef.current.on('error', () => {
        console.log(`failed to connect to ${relayRef.current.url}`)
      })
    }
  }
  return {
    relay: relayRef.current,
    connect,
  }
}
