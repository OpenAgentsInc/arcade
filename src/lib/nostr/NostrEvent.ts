import * as SQLite from 'expo-sqlite'

export class NostrEvent {
  private rawEvent: any
  private db: any

  constructor(rawEvent: any, db: SQLite.WebSQLDatabase) {
    this.rawEvent = rawEvent
    this.db = db
  }

  async save() {
    console.log("Let's try to save event.")
  }
}
