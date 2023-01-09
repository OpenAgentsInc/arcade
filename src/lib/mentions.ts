export const parseMentions = (content: string, tags: any[]) => {
  // If the content is blank, return an empty array.
  if (!content) {
    return []
  }

  // Create an empty array to store the parsed strings.
  const out: any[] = []

  // Set the start and end indices of the content.
  let start = 0
  const end = content.length

  // Use a regular expression to match hashtags in the content.
  const hashtagRegex = /#\w+/g
  const hashtags = content.match(hashtagRegex)
  if (hashtags) {
    // If hashtags are found, add them to the output array.
    hashtags.forEach((hashtag) => {
      out.push(hashtag)
    })
  }

  // Use a regular expression to match URLs in the content.
  const urlRegex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  const urls = content.match(urlRegex)
  if (urls) {
    // If URLs are found, add them to the output array.
    urls.forEach((url) => {
      out.push(url)
    })
  }

  // If the tags array is not empty, parse the tag and add it to the output array.
  if (tags.length > 0) {
    const tag = tags[0]
    const tagName = tag[0]
    const tagValue = tag[1]
    const tagStart = content.indexOf(tagName)
    const tagEnd = tagStart + tagName.length
    // Check if the tag is in the content and if the start and end indices are within the content
    if (tagStart > -1 && tagStart >= start && tagEnd <= end) {
      // Get the substring from the start index to the tag start index
      const text = content.substring(start, tagStart)
      // Push the text and the tag to the output array
      out.push(text)
      out.push(`${tagName}${tagValue}`)
      // Update the start index to the index of the end of the tag value.
      start = tagEnd
      // Remove the tag from the tags array
      tags.shift()
    }
  }

  // If none of the other conditions were met, add the remaining content to the output array.
  out.push(content.substring(start))

  // Return the output array.
  return out
}
