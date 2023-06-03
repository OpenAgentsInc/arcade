import React, { createContext, useEffect, useMemo } from "react"
import { useStores } from "app/models"
import { connectDb, ArcadeIdentity, NostrPool } from "arclib/src"
import { observer } from "mobx-react-lite"

export const DEFAULT_RELAYS = [
  "wss://relay.arcade.city",
  "wss://arc1.arcadelabs.co",
  "wss://relay.damus.io",
]

export const RelayContext = createContext({})

const db: any = connectDb()

export const RelayProvider = observer(function RelayProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (!db) throw new Error("cannot initialized db")

  const {
    userStore: { privkey, metadata, isNewUser, clearNewUser },
  } = useStores()

  const ident = useMemo(() => (privkey ? new ArcadeIdentity(privkey, "", "") : null), [privkey])
  const pool = useMemo(() => (ident ? new NostrPool(ident, db) : null), [privkey])

  useEffect(() => {
    if (!pool) return

    async function initRelays() {
      await pool.setRelays(DEFAULT_RELAYS)
      if (isNewUser) {
        console.log("creating user...")
        const res = await pool.send({
          content: metadata,
          tags: [],
          kind: 0,
        })
        console.log('created:', res)
        clearNewUser()
      }
    }
    initRelays().catch(console.error)
  }, [pool])

  return <RelayContext.Provider value={pool}>{children}</RelayContext.Provider>
})
