import { useEffect, useState } from 'react'

import { RelayPool } from './relay-pool'

export function useRelayPool(
  relays?: string[],
  options: { noCache?: boolean } = {}
) {
  const [relayPool, setRelayPool] = useState<RelayPool | null>(null)

  useEffect(() => {
    // console.log('Hello.', relays)
    const newRelayPool = new RelayPool(relays, options)
    setRelayPool(newRelayPool)
    return () => {
      newRelayPool.close()
      setRelayPool(null)
    }
  }, [relays])

  //   useEffect(() => {
  //     if (relayPool) return
  //     const newRelayPool = new RelayPool(relays, options)
  //     setRelayPool(newRelayPool)
  //     return () => {
  //       newRelayPool.close()
  //       setRelayPool(null)
  //     }
  //   }, [relayPool, relays, options])

  console.log(relayPool)

  return relayPool
}
