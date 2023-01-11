import { useEffect, useState } from 'react'

import { RelayPool } from './relay-pool'

export function useRelayPool(
  relays?: string[],
  options: { noCache?: boolean } = {}
) {
  const [relayPool, setRelayPool] = useState<RelayPool | null>(null)

  useEffect(() => {
    const newRelayPool = new RelayPool(relays, options)
    setRelayPool(newRelayPool)
    return () => {
      newRelayPool.close()
      setRelayPool(null)
    }
  }, [relays])

  return relayPool
}
