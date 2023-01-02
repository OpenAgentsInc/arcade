import { relayInit } from 'nostr-tools'
import { useRef } from 'react'

export const useNostr = () => {
  const relaysRef = useRef<any[]>([])
  const connect = async (urls: string[]) => {
    if (relaysRef.current.length > 0) {
      console.warn('Already connected to some relays, ignoring new connections')
      return
    }
    let index = 0
    for (const url of urls) {
      if (!relaysRef.current[index]) {
        relaysRef.current[index] = relayInit(url)
      }
      await relaysRef.current[index].connect()
      relaysRef.current[index].on('connect', () => {
        console.log(`connected to ${relaysRef.current[index].url}`)
      })
      relaysRef.current[index].on('error', () => {
        console.log(`failed to connect to ${relaysRef.current[index].url}`)
      })
      index += 1
    }
  }
  return {
    relays: relaysRef.current,
    connect,
  }
}
