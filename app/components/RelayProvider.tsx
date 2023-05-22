import React, { createContext, useEffect, useMemo } from "react"
import { ArcadeIdentity, NostrPool } from "arclib"
import { useStores } from "app/models"
import { nip19 } from "nostr-tools"

export const DEFAULT_RELAYS = [
  "wss://relay.arcade.city",
  "wss://arc1.arcadelabs.co",
  "wss://welcome.nostr.wine",
  "wss://relay.nostr.band/all",
  "wss://nostr.mutinywallet.com",
]

export const RelayContext = createContext({})

export default function RelayProvider({ children }: { children: React.ReactNode }) {
  const {
    userStore: { privkey },
  } = useStores()

  const nsec = useMemo(() => (privkey ? nip19.nsecEncode(privkey) : null), [privkey])
  const ident = useMemo(() => (nsec ? new ArcadeIdentity(nsec, "", "") : null), [nsec])

  const pool = new NostrPool(ident)

  useEffect(() => {
    async function initRelays() {
      await pool.setRelays(DEFAULT_RELAYS)
    }

    if (nsec) {
      initRelays().catch(console.error)
    }
  }, [pool, nsec])

  return <RelayContext.Provider value={pool}>{children}</RelayContext.Provider>
}
