import { Database } from 'app/lib/Database'
import { useStore } from 'app/stores'
import { useEffect, useMemo } from 'react'

export const useDatabase = () => {
  const database = useStore((state) => state.database)
  const setDatabase = useStore((state) => state.databaseActions.setDatabase)

  const initializedDatabase = useMemo(() => {
    if (database) return database
    const newDatabase = new Database()
    setDatabase(newDatabase)
    console.log('Set database', newDatabase)
    return newDatabase
  }, [database, setDatabase])

  useEffect(() => {
    return () => {
      initializedDatabase.close()
    }
  }, [initializedDatabase])

  return initializedDatabase
}
