export const parseMentions = (content: string, tags: any[]) => {
  if (!content) {
    return []
  }

  const out: any[] = []

  let start = 0
  const end = content.length

  for (let i = 0; i < end; i++) {
    const c = content.charAt(i)

    if (c === '#') {
      const hashtag = content.substring(start, i)
      const tag = content.substring(i + 1, end)
      out.push(hashtag)
      out.push(`#${tag}`)
      start = i + 1
    } else if (c === 'h' || c === 'H') {
      const url = content.substring(start, i)
      const link = content.substring(i, end)
      out.push(url)
      out.push(`${link}`)
      start = i
    } else if (c === 'l' || c === 'L') {
      const invoice = content.substring(start, i)
      const lnbc = content.substring(i, end)
      out.push(invoice)
      out.push(`${lnbc}`)
      start = i
    }
  }

  if (start < end) {
    const text = content.substring(start, end)
    out.push(text)
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
