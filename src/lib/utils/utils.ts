import { format, formatDistanceToNow, parse } from 'date-fns'

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const formatTimestampString = (timestamp: string) => {
  const date = new Date(timestamp)
  const formattedTimestamp = format(date, 'dd LLL yyyy - HH:mm')
  return formattedTimestamp
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

export const truncateString = (string: string, maxLength: number) => {
  if (string.length <= maxLength) {
    return string
  }
  return `${string.substring(0, maxLength)}...`
}

export function getLastETagId(tags: string[][]) {
  let lastETag = ''

  tags.forEach((tag) => {
    if (tag[0] === 'e') {
      lastETag = tag[1]
    }
  })

  return lastETag
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isEven = (num: number) => {
  return num % 2 === 0
}
