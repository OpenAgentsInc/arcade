import { Database } from 'app/lib/Database'
import { useStore } from 'app/stores'
import { useEffect } from 'react'
import { Alert } from 'react-native'

export const useDatabase = () => {
  const database = useStore((state) => state.database)
  const setChannels = useStore((state) => state.chatActions.setChannels)
  const setDatabase = useStore((state) => state.databaseActions.setDatabase)

  useEffect(() => {
    const initializeDatabase = async () => {
      if (database) return

      const newDatabase = new Database()
      setDatabase(newDatabase)
      console.log('Initialized database.')

      const channels = await newDatabase.getChannels()
      setChannels(channels)
      console.log(`${channels.length} channels hydrated.`)
    }

    setTimeout(() => {
      initializeDatabase()
    }, 2000)

    return () => {
      database?.close()
    }
  }, [database, setDatabase])
}
