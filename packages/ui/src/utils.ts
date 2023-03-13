import { formatDistanceToNow } from 'date-fns'

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// export const formatTimestamp = (timestamp: string) => {
//   const date = new Date(timestamp)
//   const formattedTimestamp = formatDistanceToNow(date, {
//     addSuffix: true,
//     includeSeconds: true,
//   })
//   return formattedTimestamp
// }

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

export const truncateString = (string: string, maxLength: number) => {
  if (string.length <= maxLength) {
    return string
  }
  return `${string.substring(0, maxLength)}...`
}

export const randomFourLetterString = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
