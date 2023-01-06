import { Database } from 'app/lib/database'
import { useStore } from 'app/stores'
import { useEffect, useMemo } from 'react'

export const useDatabase = () => {
  const database = useStore((state) => state.database)
  const setDatabase = useStore((state) => state.databaseActions.setDatabase)

  const initializedDatabase = useMemo(() => {
    if (database) return database
    const newDatabase = new Database()
    setDatabase(newDatabase)
    console.log('Created new database', newDatabase)
    return newDatabase
  }, [database, setDatabase])

  useEffect(() => {
    return () => {
      initializedDatabase.close()
    }
  }, [initializedDatabase])

  return initializedDatabase
}
