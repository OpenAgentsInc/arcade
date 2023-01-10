export function parseMentions(content: string, mentions: any[]): any[] {
  const parsed: any[] = []

  // Find all hashtags in the content
  let currentIndex = 0
  while (currentIndex < content.length) {
    const nextHashtagIndex = content.indexOf('#', currentIndex)
    if (nextHashtagIndex === -1) {
      // No more hashtags found, add the rest of the content to the parsed array
      parsed.push(content.substring(currentIndex))
      break
    }
    // Add the text before the hashtag to the parsed array
    parsed.push(content.substring(currentIndex, nextHashtagIndex))

    // Find the end of the hashtag
    let hashtagEnd = nextHashtagIndex + 1
    while (hashtagEnd < content.length && !content[hashtagEnd].match(/\s/)) {
      hashtagEnd++
    }
    // Add the hashtag to the parsed array
    parsed.push(content.substring(nextHashtagIndex, hashtagEnd))
    currentIndex = hashtagEnd
  }

  // Return the parsed array, filtering out any empty strings
  return parsed.filter((part) => part.trim().length > 0)
}
