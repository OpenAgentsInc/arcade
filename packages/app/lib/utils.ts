export function isValidImageUrl(url: string): boolean {
  // TODO: this needs work
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  if (urlRegex.test(url)) {
    console.log('VALID:', url)
    return true
  } else {
    console.log('INVALID:', url)
    return false
  }
}
