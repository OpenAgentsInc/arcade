import * as SQLite from 'expo-sqlite'
import { useEffect } from 'react'

import { createTables } from './createTables'
import { databaseReport } from './databaseReport'

const openDatabase = () => SQLite.openDatabase('arc5.db')
const db = openDatabase()

let did = false

export const useDatabase = () => {
  useEffect(() => {
    if (did) return
    createTables(db)
    databaseReport(db)
    did = true
  }, [])

  return db
}
