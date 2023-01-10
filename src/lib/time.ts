import { differenceInSeconds } from 'date-fns'

export const timeAgoSince = (date: Date) => {
  const now = new Date()
  const seconds = differenceInSeconds(now, date)

  if (seconds < 3) {
    return 'now'
  }

  if (seconds < 60) {
    return `${seconds}s`
  }

  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m`
  }

  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h`
  }

  if (seconds < 604800) {
    return `${Math.floor(seconds / 86400)}d`
  }

  if (seconds < 2592000) {
    return `${Math.floor(seconds / 604800)}w`
  }

  if (seconds < 31536000) {
    return `${Math.floor(seconds / 2592000)}mo`
  }

  return `${Math.floor(seconds / 31536000)}y`
}
