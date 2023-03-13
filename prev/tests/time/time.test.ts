import {
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subSeconds,
  subWeeks,
  subYears,
} from 'date-fns'
import { timeAgoSince } from 'lib/utils'

describe('timeAgoSince', () => {
  test('returns "now" when the time difference is less than 3 seconds', () => {
    const now = new Date()
    expect(timeAgoSince(now)).toBe('now')
    expect(timeAgoSince(subSeconds(now, 2))).toBe('now')
  })

  test('returns seconds in the format "Xs" when the time difference is less than 1 minute', () => {
    const now = new Date()
    expect(timeAgoSince(subSeconds(now, 3))).toBe('3s')
    expect(timeAgoSince(subSeconds(now, 59))).toBe('59s')
  })

  test('returns minutes in the format "Xm" when the time difference is less than 1 hour', () => {
    const now = new Date()
    expect(timeAgoSince(subMinutes(now, 1))).toBe('1m')
    expect(timeAgoSince(subMinutes(now, 59))).toBe('59m')
  })

  test('returns hours in the format "Xh" when the time difference is less than 1 day', () => {
    const now = new Date()
    expect(timeAgoSince(subHours(now, 1))).toBe('1h')
    expect(timeAgoSince(subHours(now, 23))).toBe('23h')
  })

  test('returns days in the format "Xd" when the time difference is less than 1 week', () => {
    const now = new Date()
    expect(timeAgoSince(subDays(now, 1))).toBe('1d')
    expect(timeAgoSince(subHours(now, 24 * 6))).toBe('6d')
  })

  test('returns weeks in the format "Xw" when the time difference is less than 1 month', () => {
    const now = new Date()
    expect(timeAgoSince(subWeeks(now, 1))).toBe('1w')
    expect(timeAgoSince(subHours(now, 24 * 7))).toBe('1w')
    expect(timeAgoSince(subHours(now, 24 * 8))).toBe('1w')
    expect(timeAgoSince(subHours(now, 24 * 9))).toBe('1w')
    expect(timeAgoSince(subWeeks(now, 2))).toBe('2w')
    expect(timeAgoSince(subWeeks(now, 3))).toBe('3w')
    expect(timeAgoSince(subHours(now, 24 * 28))).toBe('4w')
  })

  test('returns months in the format "Xmo" when the time difference is less than 1 year', () => {
    const now = new Date()
    expect(timeAgoSince(subMonths(now, 1))).toBe('4w')
    expect(timeAgoSince(subMonths(now, 11))).toBe('11mo')
  })

  test('returns years in the format "Xy" when the time difference is more than or equal to 1 year', () => {
    const now = new Date()
    expect(timeAgoSince(subYears(now, 1))).toBe('1y')
    expect(timeAgoSince(subYears(now, 1000))).toBe('1000y')
  })
})
