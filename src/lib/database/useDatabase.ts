import * as SQLite from 'expo-sqlite'

const openDatabase = () => SQLite.openDatabase('arc4.db')
const db = openDatabase()

export const useDatabase = () => {
  //   console.log('db:', db)
  return {}
}
