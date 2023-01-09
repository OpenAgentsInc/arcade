export const parseMentions = (content: string, tags: any[]) => {
  if (!content) {
    return []
  }

  const out: any[] = []

  const bs = {
    num_blocks: 0,
    blocks: [],
  }

  arc_parse_content(bs, content)

  for (let i = 0; i < bs.num_blocks; i++) {
    const block = bs.blocks[i]
    const converted = convert_block(block, tags)
    if (converted) {
      out.push(converted)
    }
  }

  return out
}

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
      start = i + 1
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
      start = i
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
      start = i
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
