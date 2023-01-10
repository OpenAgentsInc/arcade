// @ts-nocheck
export const arc_parse_content = (bs: any, content: string) => {
  if (!content) {
    return false
  }

  let start = 0
  const end = content.length

  for (let i = 0; i < end; i++) {
    const c = content.charAt(i)

    if (c === '#') {
      const block = {
        type: 'BLOCK_HASHTAG',
        block: {
          str: {
            start: content.substring(start, i),
            end: content.substring(i + 1, end),
          },
        },
      }
      bs.blocks.push(block)
      start = i + block.block.str.end.length + 1
    } else if (c === 'h' || c === 'H') {
      const block = {
        type: 'BLOCK_URL',
        block: {
          str: {
            start: content.substring(start, i),
            end: content.substring(i, end),
          },
        },
      }
      bs.blocks.push(block)
      start = i + block.block.str.end.length
    } else if (c === 'l' || c === 'L') {
      const block = {
        type: 'BLOCK_INVOICE',
        block: {
          invstr: {
            start: content.substring(start, i),
            end: content.substring(i, end),
          },
        },
      }
      bs.blocks.push(block)
      start = i + block.block.invstr.end.length
    }
  }

  if (start < end) {
    const block = {
      type: 'BLOCK_TEXT',
      block: {
        str: {
          start: content.substring(start, end),
          end: content.substring(end, end),
        },
      },
    }
    bs.blocks.push(block)
  }

  return true
}

//////

const MAX_BLOCKS = 100

type Cursor = {
  p: number
  start: number
  end: number
}

function isWhitespace(c: string): boolean {
  return (
    c === ' ' ||
    c === ' ' ||
    c === '\n' ||
    c === '' ||
    c === '' ||
    c === '\u2028'
  )
}

function makeCursor(c: Cursor, content: string, len: number): void {
  c.start = content.charCodeAt(0)
  c.end = content.charCodeAt(len)
  c.p = content.charCodeAt(0)
}

function consumeUntilWhitespace(cur: Cursor, orEnd: number): number {
  let c: string

  while (cur.p < cur.end) {
    c = String.fromCharCode(cur.p)

    if (isWhitespace(c)) {
      return 1
    }

    cur.p++
  }

  return orEnd
}

function parseChar(cur: Cursor, c: string): number {
  if (cur.p >= cur.end) {
    return 0
  }

  if (String.fromCharCode(cur.p) === c) {
    cur.p++
    return 1
  }

  return 0
}

function peekChar(cur: Cursor, ind: number): number {
  if (cur.p + ind < cur.start || cur.p + ind >= cur.end) {
    return -1
  }

  return String.fromCharCode(cur.p + ind).charCodeAt(0)
}

function parseDigit(cur: Cursor, digit: number): number {
  let c: number
  if ((c = peekChar(cur, 0)) === -1) {
    return 0
  }

  c -= '0'.charCodeAt(0)

  if (c >= 0 && c <= 9) {
    digit = c
    cur.p++
    return 1
  }
  return 0
}

function parseStr(cur: Cursor, str: string): number {
  let i: number
  let c: string
  let cs: string
  let len: number

  len = str.length

  if (cur.p + len >= cur.end) {
    return 0
  }

  for (i = 0; i < len; i++) {
    c = String.fromCharCode(cur.p + i).toLowerCase()
    cs = str[i].toLowerCase()

    if (c !== cs) {
      return 0
    }
  }

  cur.p += len

  return 1
}

type Block = {
  type: number
  block: {
    mention: number
    str: {
      start: string
      end: string
    }
    invoice: {
      invstr: {
        start: string
        end: string
      }
      bolt11: any
    }
  }
}

function parseMention(cur: Cursor, block: Block): number {
  let d1: number
  let d2: number
  let d3: number
  let ind: number
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

  block.type = 1
  block.block.mention = ind

  return 1
}

function parseHashtag(cur: Cursor, block: Block): number {
  let c: number
  const start: number = cur.p

  if (!parseChar(cur, '#')) {
    return 0
  }

  c = peekChar(cur, 0)
  if (
    c === -1 ||
    isWhitespace(String.fromCharCode(c)) ||
    c === '#'.charCodeAt(0)
  ) {
    cur.p = start
    return 0
  }

  consumeUntilWhitespace(cur, 1)

  block.type = 2
  block.block.str.start = String.fromCharCode(start + 1)
  block.block.str.end = String.fromCharCode(cur.p)

  return 1
}

type Blocks = {
  blocks: Block[]
  num_blocks: number
}

function addBlock(blocks: Blocks, block: Block): number {
  if (blocks.num_blocks + 1 >= MAX_BLOCKS) {
    return 0
  }

  blocks.blocks[blocks.num_blocks++] = block
  return 1
}

function addTextBlock(blocks: Blocks, start: string, end: string): number {
  let b: Block

  if (start === end) {
    return 1
  }

  b.type = 0
  b.block.str.start = start
  b.block.str.end = end

  return addBlock(blocks, b)
}
