import React, { createContext, useEffect, useMemo, useState } from "react"
import { useStores } from "app/models"
import {
  connectDb,
  ArcadeIdentity,
  NostrPool,
  ArcadeDb,
  ChannelManager,
  PrivateMessageManager,
} from "app/arclib/src"
import { observer } from "mobx-react-lite"
import { ContactManager } from "app/arclib/src/contacts"
import { ProfileManager } from "app/arclib/src/profile"

export const RelayContext = createContext({
  pool: null as NostrPool,
  channelManager: null as ChannelManager,
  contactManager: null as ContactManager,
  profileManager: null as ProfileManager,
  privMessageManager: null as PrivateMessageManager,
})
const db: ArcadeDb = connectDb()

export const RelayProvider = observer(function RelayProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (!db) throw new Error("cannot initialized db")

  const {
    userStore: { getRelays, privkey },
  } = useStores()

  const ident = useMemo(() => (privkey ? new ArcadeIdentity(privkey, "", "") : null), [privkey])
  const [pool, _setPool] = useState<NostrPool>(
    () => new NostrPool(ident, db, { skipVerification: true }),
  )
  const channelManager = useMemo(() => new ChannelManager(pool), [pool])
  const contactManager = useMemo(() => new ContactManager(pool), [pool])
  const profileManager = useMemo(() => new ProfileManager(pool), [pool])
  const privMessageManager = useMemo(() => new PrivateMessageManager(pool), [pool])

  useEffect(() => {
    pool.ident = ident

    async function initRelays() {
      await pool.setRelays(getRelays)
      console.log("connected to relays: ", getRelays)
    }

    initRelays().catch(console.error)

    return () => {
      pool.close()
    }
  }, [ident, getRelays])

  return (
    <RelayContext.Provider
      value={{ pool, channelManager, contactManager, profileManager, privMessageManager }}
    >
      {children}
    </RelayContext.Provider>
  )
})
