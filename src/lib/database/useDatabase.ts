import * as SQLite from 'expo-sqlite'
import { useEffect } from 'react'

import { createTables } from './createTables'

const openDatabase = () => SQLite.openDatabase('arc4.db')
const db = openDatabase()

export const useDatabase = () => {
  useEffect(() => {
    createTables(db)
  }, [])

  return {}
}
