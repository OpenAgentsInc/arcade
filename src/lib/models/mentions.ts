type NostrPost = {
  content: string
  references: string[]
  kind: PostKind
}

enum PostKind {
  TextPost = 1,
  ImagePost = 2,
  AudioPost = 3,
}

export const postToEvent = (
  post: NostrPost,
  privkey: string,
  pubkey: string
) => {
  const tags = post.references.map(refidToTag)
  const postBlocks = parsePostBlocks(post.content)
  const postTags = makePostTags(postBlocks, tags)
  const content = renderBlocks(postTags.blocks)
  const newEv = new NostrEvent(content, pubkey, post.kind, postTags.tags)
  newEv.calculateId()
  newEv.sign(privkey)
  return newEv
}

export const parseMentions = (content: string, tags: any[]) => {
  // If the content is blank, return an empty array.
  if (!content) {
    return []
  }

  // Create an empty array to store the parsed strings.
  const out: any[] = []

  // Set the start and end indices of the content.
  let start = 0
  //   const end = content.length

  // Use a regular expression to match and extract hashtags from the content string.
  const hashtagRegex = /#\w+/g
  let hashtagMatch
  while ((hashtagMatch = hashtagRegex.exec(content)) !== null) {
    // Extract the hashtag from the match.
    const hashtag = hashtagMatch[0]
    // Get the index of the start of the hashtag.
    const hashtagStart = hashtagMatch.index
    // Get the index of the end of the hashtag.
    const hashtagEnd = hashtagStart + hashtag.length
    // If the hashtag start index is after the current start index, add the substring between the start index and the hashtag start index to the output array.
    if (hashtagStart > start) {
      out.push(content.substring(start, hashtagStart))
    }
    // Add the hashtag to the output array, minus the hashtag itself.
    out.push(hashtag.substring(1))
    // Update the start index to the index of the end of the hashtag.
    start = hashtagEnd
  }

  // Use a regular expression to match and extract URLs from the content string.
  const urlRegex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  let urlMatch
  while ((urlMatch = urlRegex.exec(content)) !== null) {
    // Extract the URL from the match.
    const url = urlMatch[0]
    // Get the index of the start of the URL.
    const urlStart = urlMatch.index
    // Get the index of the end of the URL.
    const urlEnd = urlStart + url.length
    // If the URL start index is after the current start index, add the substring between the start index and the URL start index to the output array.
    if (urlStart > start) {
      out.push(content.substring(start, urlStart))
    }
    // Add the URL to the output array.
    out.push(url)
    // Update the start index to the index of the end of the URL.
    start = urlEnd
  }

  // Use a regular expression to match and extract Lightning Network invoices from the content string.
  const invoiceRegex = /ln[bc]\w+/g
  let invoiceMatch
  while ((invoiceMatch = invoiceRegex.exec(content)) !== null) {
    // Extract the invoice from the match.
    const invoice = invoiceMatch[0]
    // Get the index of the start of the invoice.
    const invoiceStart = invoiceMatch.index
    // Get the index of the end of the invoice.
    const invoiceEnd = invoiceStart + invoice.length
    // If the invoice start index is after the current start index, add the substring between the start index and the invoice start index to the output array.
    if (invoiceStart > start) {
      out.push(content.substring(start, invoiceStart))
    }
    // Add the invoice to the output array.
    out.push(invoice)
    // Update the start index to the index of the end of the invoice.
    start = invoiceEnd
  }

  // If there is any content remaining after parsing the mentions, add it to the output array.
  if (start < content.length) {
    out.push(content.substring(start))
  }

  return out
}

function refidToTag(refid: string): string[] {
  return ['e', refid]
}
