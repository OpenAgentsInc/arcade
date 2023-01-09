import { parseMentions } from 'lib/mentions'

test('parses a blank mention', () => {
  const parsed = parseMentions('', [['e', 'event_id']])

  expect(parsed).toBeDefined()
  expect(parsed.length).toBe(0)
})

test('parses mention with only text', () => {
  const parsed: any = parseMentions('there is no mention here', [
    ['e', 'event_id'],
  ])

  expect(parsed).not.toBeNull()
  expect(parsed.length).toBe(1)
  expect(parsed[0]).toBe('there is no mention here')
})
