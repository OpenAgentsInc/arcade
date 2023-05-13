import React, { createContext, useEffect, useMemo } from "react"
import { ArcadeIdentity, NostrPool } from "arclib"
import { generatePrivateKey, nip19 } from "nostr-tools"

const DEFAULT_RELAYS = [
  "wss://welcome.nostr.wine",
  "wss://relay.nostr.band/all",
  "wss://nostr.mutinywallet.com",
  "wss://relay.damus.io",
]

export const RelayContext = createContext({})

export default function RelayProvider({ children }: { children: React.ReactNode }) {
  const priv = useMemo(() => generatePrivateKey(), [])
  const nsec = nip19.nsecEncode(priv)

  const ident = useMemo(() => new ArcadeIdentity(nsec, "", ""), [])
  const pool = useMemo(() => new NostrPool(ident), [])

  useEffect(() => {
    async function initRelays() {
      await pool.setRelays(DEFAULT_RELAYS) 
    }

    initRelays().catch(console.error);
  }, [])

  return <RelayContext.Provider value={pool}>{children}</RelayContext.Provider>
}
