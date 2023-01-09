function makeCursor(cursor: any, content: Uint8Array, len: number) {
  cursor.start = content
  cursor.end = new Uint8Array(content.length + len) // ?
  cursor.p = content
}

function arcParseContent(blocks: any, content: string): boolean {
  let cp: number, c: number
  const cur: any = {}
  const block: any = {}
  let start: any, preMention: any

  blocks.num_blocks = 0
  makeCursor(cur, content, content.length)

  start = cur.p
  while (cur.p < cur.end && blocks.num_blocks < MAX_BLOCKS) {
    cp = peekChar(cur, -1)
    c = peekChar(cur, 0)

    preMention = cur.p
    if (cp === -1 || isWhitespace(cp)) {
      if (c === '#' && (parseMention(cur, block) || parseHashtag(cur, block))) {
        if (!addTextThenBlock(cur, blocks, block, start, preMention)) {
          return false
        }
        continue
      } else if ((c === 'h' || c === 'H') && parseUrl(cur, block)) {
        if (!addTextThenBlock(cur, blocks, block, start, preMention)) {
          return false
        }
        continue
      } else if ((c === 'l' || c === 'L') && parseInvoice(cur, block)) {
        if (!addTextThenBlock(cur, blocks, block, start, preMention)) {
          return false
        }
        continue
      }
    }

    cur.p++
  }

  if (cur.p - start > 0) {
    if (!addTextBlock(blocks, start, cur.p)) {
      return false
    }
  }

  return true
}

export const parseMentions = (content: string, tags: any[]) => {
  if (!content) {
    return []
  }

  const out: any[] = []

  const bs = {
    num_blocks: 0,
    blocks: [],
  }

  arcParseContent(bs, content)

  for (let i = 0; i < bs.num_blocks; i++) {
    const block = bs.blocks[i]
    const converted = convert_block(block, tags)
    if (converted) {
      out.push(converted)
    }
  }

  return out
}
