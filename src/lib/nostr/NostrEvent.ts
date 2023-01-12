import * as SQLite from 'expo-sqlite'

export class NostrEvent {
  public created_at: number
  public content: string
  public id: string
  public kind: number
  public pubkey: string
  public sig: string
  public tags: string[][]
  private rawEvent: any
  private db: any

  constructor(rawEvent: any, db: SQLite.WebSQLDatabase) {
    this.rawEvent = rawEvent
    this.db = db
    this.content = rawEvent.content
    this.created_at = rawEvent.created_at
    this.id = rawEvent.id
    this.kind = rawEvent.kind
    this.pubkey = rawEvent.pubkey
    this.sig = rawEvent.sig
    this.tags = rawEvent.tags
  }

  async save() {
    console.log("Let's try to save event.")
  }
}
