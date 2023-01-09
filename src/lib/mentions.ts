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

function parseMention(cur: Cursor, block: Block): number {
  let d1: number, d2: number, d3: number, ind: number
  const start: number = cur.p

  if (!parseStr(cur, '#[')) {
    return 0
  }

  if (!parseDigit(cur, d1)) {
    cur.p = start
    return 0
  }

  ind = d1

  if (parseDigit(cur, d2)) {
    ind = d1 * 10 + d2
  }

  if (parseDigit(cur, d3)) {
    ind = d1 * 100 + d2 * 10 + d3
  }

  if (!parseChar(cur, ']')) {
    cur.p = start
    return 0
  }

  block.type = BlockType.MENTION
  block.block.mention = ind

  return 1
}
