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
    try {
      switch (this.kind) {
        case 1:
          this.saveNote()
          break
        case 4:
          this.saveDirectMessage()
          break
        case 40:
          this.saveChannel()
          break
        default:
          console.log(`Event kind ${this.kind} is not handled yet.`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Kind 1
  private saveNote() {
    console.log('Attempting saveNote')
    const { id, pubkey, created_at, kind, tags, content, sig } = this
    const sql = `INSERT INTO arc_notes (id, pubkey, created_at, kind, tags, content, sig) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const params = [
      id,
      pubkey,
      created_at,
      kind,
      JSON.stringify(tags),
      content,
      sig,
    ]
    this.db.transaction((tx) => {
      tx.executeSql(sql, params)
    })
  }

  // Kind 4
  private saveDirectMessage() {
    const { id, pubkey, created_at, kind, tags, content, sig } = this
    const sql = `INSERT INTO arc_direct_messages (id, pubkey, created_at, kind, tags, content, sig) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const params = [
      id,
      pubkey,
      created_at,
      kind,
      JSON.stringify(tags),
      content,
      sig,
    ]
    this.db.transaction((tx) => {
      tx.executeSql(sql, params)
    })
  }

  // Kind 40
  private saveChannel() {
    const metadata = JSON.parse(this.content)
    const { name, about, picture } = metadata
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO arc_channels (id, pubkey, sig, name, about, picture, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.pubkey,
          this.sig,
          name,
          about,
          picture,
          this.created_at.toString(),
        ],
        (_, result) => {
          console.log(
            `Saved channel ${name}, rowsAffected ${result.rowsAffected}}`
          )
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save channel error', error)
          return false
        }
      )
    })
  }
}
