import * as SQLite from 'expo-sqlite'
import { useEffect } from 'react'

import { createTables } from './createTables'
import { databaseReport } from './databaseReport'

const openDatabase = () => SQLite.openDatabase('arc4.db')
const db = openDatabase()

export const useDatabase = () => {
  useEffect(() => {
    createTables(db)
    databaseReport(db)
  }, [])

  return db
}
