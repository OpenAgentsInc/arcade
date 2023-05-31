import React, { createContext, useEffect, useMemo } from "react"
import { useStores } from "app/models"
import { connectDb, ArcadeIdentity, NostrPool } from "arclib/src"

export const DEFAULT_RELAYS = [
  "wss://relay.arcade.city",
  "wss://arc1.arcadelabs.co",
  "wss://welcome.nostr.wine",
  "wss://relay.nostr.band/all",
]

export const RelayContext = createContext({})

const db: any = connectDb();

export default function RelayProvider({ children }: { children: React.ReactNode }) {
  if (!db) throw new Error('cannot initialized db');
  console.log('connected to db:', db)

  const {
    userStore: { privkey },
  } = useStores()

  const ident = useMemo(() => (privkey ? new ArcadeIdentity(privkey, "", "") : null), [privkey])
  const pool = useMemo(() => (ident ? new NostrPool(ident, db) : null), [privkey, ident])

  useEffect(() => {
    if (!privkey) return;

    async function initRelays() {
      if(!pool) throw new Error("relaypool is not initialized")
      await pool.setRelays(DEFAULT_RELAYS)
    }
    initRelays().catch(console.error)
  }, [pool])

  return <RelayContext.Provider value={pool}>{children}</RelayContext.Provider>
}
