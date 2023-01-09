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
      start = i + tag.length + 1
    } else if (c === 'h' || c === 'H') {
      const url = content.substring(start, i)
      const link = content.substring(i, end)
      out.push(url)
      out.push(`${link}`)
      start = i + link.length
    } else if (c === 'l' || c === 'L') {
      const invoice = content.substring(start, i)
      const lnbc = content.substring(i, end)
      out.push(invoice)
      out.push(`${lnbc}`)
      start = i + lnbc.length
    }
  }

  if (start < end) {
    const text = content.substring(start, end)
    out.push(text)
  }

  return out
}
