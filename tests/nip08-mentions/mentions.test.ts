import { parseMentions } from 'lib/models/mentions/parseMentions'

test('parses a blank mention', () => {
  const parsed = parseMentions('', [['e', 'event_id']])

  expect(parsed).toBeDefined()
  expect(parsed.length).toBe(0)
})

test('parses a hashtag', () => {
  const parsed: any = parseMentions('some hashtag #bitcoin derp', [])

  expect(parsed).not.toBeNull()
  expect(parsed.length).toBe(3)
  expect(parsed[0]).toBe('some hashtag ')
  expect(parsed[1]).toBe('bitcoin')
  expect(parsed[2]).toBe(' derp')
})

test('parses a hashtag at the end of the content', () => {
  const parsed: any = parseMentions('some hashtag #bitcoin', [])

  expect(parsed).not.toBeNull()
  expect(parsed.length).toBe(2)
  expect(parsed[0]).toBe('some hashtag ')
  expect(parsed[1]).toBe('bitcoin')
})

test('parses mention with only text', () => {
  const parsed: any = parseMentions('there is no mention here', [
    ['e', 'event_id'],
  ])

  expect(parsed).not.toBeNull()
  expect(parsed.length).toBe(1)
  expect(parsed[0]).toBe('there is no mention here')
})
