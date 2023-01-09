import { subHours, subMinutes, subSeconds } from 'date-fns'
import { timeAgoSince } from 'lib/time'

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
    expect(timeAgoSince(subHours(now, 1))).toBe('1h')
  })
})
