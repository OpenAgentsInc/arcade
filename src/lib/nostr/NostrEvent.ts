// @ts-nocheck

import { getEventHash, signEvent } from 'nostr-tools'

enum ValidationResult {
  ok,
  bad_id,
  bad_sig,
}

interface OtherEvent {
  event_id: string
  relay_url: string
}

interface KeyEvent {
  key: string
  relay_url: string
}

interface ReferencedId {
  ref_id: string
  relay_id?: string
  key: string
}

interface EventId {
  id: string
}

export class NostrEvent {
  id: string
  sig: string
  tags: string[][]
  pubkey: string
  created_at: number
  kind: number
  content: string

  boosted_by?: string

  constructor(content: string, pubkey: string, kind: number, tags: string[][]) {
    this.content = content
    this.pubkey = pubkey
    this.kind = kind
    this.tags = tags
    this.created_at = Math.floor(Date.now() / 1000) // no
  }

  sign(privkey: string) {
    this.sig = signEvent(this, privkey)
  }

  static equals(lhs: NostrEvent, rhs: NostrEvent): boolean {
    return lhs.id === rhs.id
  }

  static lessThan(lhs: NostrEvent, rhs: NostrEvent): boolean {
    return lhs.created_at < rhs.created_at
  }

  calculateId() {
    this.id = getEventHash(this)
  }

  // custom flags for internal use
  flags: number = 0

  get is_textlike(): boolean {
    return this.kind === 1 || this.kind === 42
  }

  get too_big(): boolean {
    return this.content.length > 32000
  }

  get should_show_event(): boolean {
    return !this.too_big
  }

  get is_valid_id(): boolean {
    return calculate_event_id(this) === this.id
  }

  get is_valid(): boolean {
    return this.validity === ValidationResult.ok
  }

  get validity(): ValidationResult {
    return ValidationResult.ok //validate_event(this);
  }

  private _blocks?: Block[]
  blocks(privkey?: string): Block[] {
    if (this._blocks) {
      return this._blocks
    }
    const blocks = parse_mentions(this.get_content(privkey), this.tags)
    this._blocks = blocks
    return blocks
  }

  get inner_event(): NostrEvent | undefined {
    // don't try to deserialize an inner event if we know there won't be one
    if (this.known_kind === NostrKind.boost) {
      return event_from_json(this.content)
    }
    return undefined
  }

  _event_refs?: EventRef[]
  private event_refs(privkey?: string): EventRef[] {
    if (this._event_refs) {
      return this._event_refs
    }
    const refs = interpret_event_refs(this.blocks(privkey), this.tags)
    this._event_refs = refs
    return refs
  }
}
