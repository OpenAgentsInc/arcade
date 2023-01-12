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
        case 42:
          this.saveChannelMessage()
          break
        default:
          console.log(`Event kind ${this.kind} is not handled yet.`)
      }
    } catch (err) {
      console.error(err)
      //   console.error(err.stack)
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
    let metadata: { name: any; about: any; picture: any }
    try {
      metadata = JSON.parse(this.content)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return
    }

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
          //   console.log(
          //     `Saved channel ${name}, rowsAffected ${result.rowsAffected}}`
          //   )
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save channel error', error)
          return false
        }
      )
    })
  }

  // Kind 42
  private saveChannelMessage() {
    let channel_id: string | null = null
    let reply_event_id: string | null = null
    let root_message = false

    // Extract channel_id and reply_event_id from tags
    this.tags.forEach((tag) => {
      if (tag[0] === 'e') {
        channel_id = tag[1]
        if (tag[3] === 'reply') {
          reply_event_id = tag[1]
        }
        if (tag[3] === 'root') {
          root_message = true
        }
      }
    })

    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO arc_channel_messages (id, content, created_at, kind, pubkey, sig, tags, channel_id, reply_event_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          this.id,
          this.content,
          this.created_at.toString(),
          this.kind,
          this.pubkey,
          this.sig,
          JSON.stringify(this.tags),
          channel_id,
          reply_event_id,
        ],
        (_, result) => {
          //   console.log(
          //     `Saved channel message, rowsAffected ${result.rowsAffected}}`
          //   )
        },
        (_, error: SQLite.SQLError) => {
          console.error('Save channel message error', error)
          return false
        }
      )
    })
  }

  //   private saveChannelMessage() {
  //     console.log('content:', this.content)
  //     const metadata = JSON.parse(this.content)
  //     console.log('metadata?', metadata)
  //     const { message, channel_id, reply_event_id } = metadata
  //     this.db.transaction((tx) => {
  //       tx.executeSql(
  //         'INSERT OR REPLACE INTO arc_channel_messages (id, pubkey, sig, message, channel_id, reply_event_id, created_at, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  //         [
  //           this.id,
  //           this.pubkey,
  //           this.sig,
  //           message,
  //           channel_id,
  //           reply_event_id,
  //           this.created_at.toString(),
  //           JSON.stringify(this.tags),
  //         ],
  //         (_, result) => {
  //           console.log(
  //             `Saved channel message ${message}, rowsAffected ${result.rowsAffected}}`
  //           )
  //         },
  //         (_, error: SQLite.SQLError) => {
  //           console.error('Save channel message error', error)
  //           return false
  //         }
  //       )
  //     })
  //   }
}
