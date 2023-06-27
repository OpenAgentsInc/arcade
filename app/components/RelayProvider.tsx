import React, { createContext, useEffect, useMemo } from "react"
import { useStores } from "app/models"
import { connectDb, ArcadeIdentity, NostrPool, ArcadeDb } from "app/arclib/src"
import { observer } from "mobx-react-lite"

export const RelayContext = createContext({})

const db: ArcadeDb = connectDb()

export const RelayProvider = observer(function RelayProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (!db) throw new Error("cannot initialized db")

  const {
    userStore: { getRelays, privkey, metadata, isNewUser, clearNewUser },
  } = useStores()

  const ident = useMemo(() => (privkey ? new ArcadeIdentity(privkey, "", "") : null), [privkey])
  const pool = useMemo(() => (ident ? new NostrPool(ident, db) : null), [privkey])

  useEffect(() => {
    if (!pool) return

    async function initRelays() {
      await pool.setRelays(getRelays)
      console.log("connected to relays: ", getRelays)
      if (isNewUser) {
        console.log("creating user...")
        const res = await pool.send({
          content: metadata,
          tags: [],
          kind: 0,
        })
        console.log("created:", res)
        clearNewUser()
      }
    }
    initRelays().catch(console.error)
  }, [pool, getRelays])

  return <RelayContext.Provider value={pool}>{children}</RelayContext.Provider>
})
