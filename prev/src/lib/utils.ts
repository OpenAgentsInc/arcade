import { formatDistanceToNow } from 'date-fns'

export const formatTimestamp = (timestamp: string) => {
  const timestampNum = parseInt(timestamp)
  const date = new Date(timestampNum * 1000)
  const formattedTimestamp = formatDistanceToNow(date, { addSuffix: true })
  return formattedTimestamp
}

export const truncateString = (string: string, maxLength: number) => {
  if (string.length <= maxLength) {
    return string
  }
  return `${string.substring(0, maxLength)}...`
}

export const timeNowInSeconds = () => {
  const date = new Date()
  return Math.floor(date.getTime() / 1000)
}
