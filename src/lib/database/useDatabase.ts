import * as SQLite from 'expo-sqlite'
import { useEffect } from 'react'

import { createTables } from './createTables'

const openDatabase = () => SQLite.openDatabase('arc53.db')
export const db = openDatabase()

let did = false

export const useDatabase = () => {
  useEffect(() => {
    if (did) return
    createTables(db)
    did = true
  }, [])

  return db
}
