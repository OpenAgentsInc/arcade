import React, { createContext, useEffect, useMemo, useState } from "react"
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
    userStore: { getRelays, privkey, getMetadata, isNewUser, clearNewUser },
  } = useStores()

  const ident = useMemo(() => (privkey ? new ArcadeIdentity(privkey, "", "") : null), [privkey])
  const [pool, _setPool] = useState<NostrPool>(() => new NostrPool(ident, db, {skipVerification: true}))

  useEffect(() => {
    pool.ident = ident
    async function initRelays() {
      await pool.setRelays(getRelays)
      console.log("connected to relays: ", getRelays)
      if (isNewUser) {
        console.log("creating user...")
        const res = await pool.send({
          content: JSON.stringify(getMetadata),
          tags: [],
          kind: 0,
        })
        console.log("created:", res)
        clearNewUser()
      }
    }
    initRelays().catch(console.error)

    return () => {
      pool.close()
    }
  }, [ident, getRelays, isNewUser])

  return <RelayContext.Provider value={pool}>{children}</RelayContext.Provider>
})
