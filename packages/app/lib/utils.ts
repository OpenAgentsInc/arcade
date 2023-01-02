import { formatDistanceToNow } from 'date-fns'

export const formatTimestamp = (timestamp: string) => {
  const timestampNum = parseInt(timestamp)
  const date = new Date(timestampNum * 1000)
  const formattedTimestamp = formatDistanceToNow(date, { addSuffix: true })
  return formattedTimestamp
}

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
