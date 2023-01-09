// This function parses mentions in a given string of content. It takes in a string of content and an array of tags as parameters. It returns an array of strings that have been parsed.
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

  // Iterate through the content.
  for (let i = 0; i < end; i++) {
    const c = content.charAt(i)

    // If the character is a hashtag, parse the hashtag and add it to the output array.
    if (c === '#') {
      const hashtag = content.substring(start, i)
      let tag = content.substring(i + 1, end)
      // Check if there is a space after the hashtag
      if (tag.indexOf(' ') > -1) {
        // If there is, get the substring up to the space
        tag = tag.substring(0, tag.indexOf(' '))
      }
      // Push the hashtag and the tag to the output array
      out.push(hashtag)
      out.push(`#${tag}`)
      // Update the start index to the index of the end of the tag value.
      start = i + tag.length + 1
    }

    // If the character is an 'h' or 'H', parse the URL and add it to the output array.
    else if (c === 'h' || c === 'H') {
      // Check if the URL is valid
      const urlRegex =
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      const url = content.substring(start, i)
      const link = content.substring(i, end)
      if (urlRegex.test(link)) {
        out.push(url)
        out.push(`${link}`)
        // Update the start index to the index of the end of the URL.
        start = i + link.length
      }
    }
    // If the character is an 'l' or 'L', parse the Lightning Network invoice and add it to the output array.
    else if (c === 'l' || c === 'L') {
      const invoice = content.substring(start, i)
      const lnbc = content.substring(i, end)
      out.push(invoice)
      out.push(`${lnbc}`)
      // Update the start index to the index of the end of the invoice.
      start = i + lnbc.length
    }
    // If the tags array is not empty, parse the tag and add it to the output array.
    else if (tags.length > 0) {
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
        start = tagEnd + tagValue.length
      }
    }
  }

  // If the start index is less than the end index, add the remaining text to the output array.
  if (start < end) {
    const text = content.substring(start, end)
    out.push(text)
  }

  // Return the output array, filtering out any empty strings.
  return out.filter((item) => item !== '')
}

// Explanation:
// The tests were failing because the h/H check was assuming that what followed was a valid URL, but it may not be. I added a check to make sure that the URL is valid before pushing it to the output array.
// I also added a check to make sure that the tag is in the content and that the start and end indices are within the content before pushing it to the output array. This was causing the erroneous output of 'th' and 'eevent_id' to be pushed to the output array.
