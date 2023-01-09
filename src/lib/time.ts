import {
  differenceInSeconds,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subSeconds,
  subWeeks,
  subYears,
} from 'date-fns'

export const timeAgoSince = (date: Date) => {
  const now = new Date()
  const seconds = differenceInSeconds(now, date)
  const formatter = new Intl.DateTimeFormat('en-US', {
    // style: 'short',
  })

  if (seconds < 3) {
    return 'now'
  }

  if (seconds < 60) {
    return `${seconds}s`
  }

  if (seconds < 3600) {
    return formatter
      .format(subSeconds(now, Math.floor(seconds)))
      .replace(/s/g, 's')
  }

  if (seconds < 86400) {
    return formatter
      .format(subMinutes(now, Math.floor(seconds / 60)))
      .replace(/m/g, 'm')
  }

  if (seconds < 604800) {
    return formatter
      .format(subHours(now, Math.floor(seconds / 3600)))
      .replace(/h/g, 'h')
  }

  if (seconds < 2592000) {
    return formatter
      .format(subDays(now, Math.floor(seconds / 86400)))
      .replace(/d/g, 'd')
  }

  if (seconds < 31536000) {
    return formatter
      .format(subWeeks(now, Math.floor(seconds / 604800)))
      .replace(/w/g, 'w')
  }

  if (seconds < 3153600000) {
    return formatter
      .format(subMonths(now, Math.floor(seconds / 2592000)))
      .replace(/mo/g, 'mo')
  }

  return formatter
    .format(subYears(now, Math.floor(seconds / 31536000)))
    .replace(/y/g, 'y')
}
