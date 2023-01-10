import { formatDistanceToNow } from 'date-fns'

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) => {
  console.log(`Sleeping for ${ms}ms...`)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatTimestamp = (timestamp: string) => {
  // eslint-disable-next-line radix
  const timestampNum = parseInt(timestamp)
  const date = new Date(timestampNum * 1000)
  const formattedTimestamp = formatDistanceToNow(date, { addSuffix: true })
  return formattedTimestamp
}

export const generateRandomPlacekitten = () => {
  const width = Math.floor(Math.random() * (220 - 200 + 1)) + 200
  const height = Math.floor(Math.random() * (320 - 300 + 1)) + 300
  return `https://placekitten.com/${width}/${height}`
}

export function isValidImageUrl(url: string): boolean {
  // TODO: this needs work
  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  if (urlRegex.test(url)) {
    // console.log('VALID:', url)
    return true
  } else {
    // console.log('INVALID:', url)
    return false
  }
}

export const timeNowInSeconds = () => {
  const date = new Date()
  return Math.floor(date.getTime() / 1000)
}

export const truncateString = (string: string, maxLength: number) => {
  if (string.length <= maxLength) {
    return string
  }
  return `${string.substring(0, maxLength)}...`
}
