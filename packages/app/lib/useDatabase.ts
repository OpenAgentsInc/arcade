import { Database } from 'app/lib/Database'
import { useStore } from 'app/stores'
import { useEffect, useMemo } from 'react'
import { Alert } from 'react-native'

export const useDatabase = (): Database | undefined => {
  const database = useStore((state) => state.database)
  const setChannels = useStore((state) => state.chatActions.setChannels)
  const setDatabase = useStore((state) => state.databaseActions.setDatabase)

  const checkRows = async (newDatabase: Database) => {
    // const notes = await newDatabase.getNumberOfRows()
    // console.log(`There are ${notes} of such rows in the database.`)
    const channels = await newDatabase.getChannels()
    setChannels(channels)
    console.log(`${channels.length} channels hydrated.`)
  }

  const initializedDatabase = useMemo(() => {
    if (database) return database

    setTimeout(() => {
      const newDatabase = new Database()
      setDatabase(newDatabase)
      console.log('Initialized database.')
      checkRows(newDatabase)
    }, 2000)
  }, [database, setDatabase])

  useEffect(() => {
    return () => {
      initializedDatabase?.close()
    }
  }, [initializedDatabase])

  return initializedDatabase
}
