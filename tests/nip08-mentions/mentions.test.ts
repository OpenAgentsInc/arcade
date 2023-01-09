import { parseMentions } from 'lib/mentions'

test('parses a blank mention', () => {
  const parsed = parseMentions('', [['e', 'event_id']])

  expect(parsed).toBeDefined()
  expect(parsed.length).toBe(0)
})

// test('make hashtag post', () => {
//   const privkey =
//     'd05f5fcceef3e4529703f62a29222d6ee2d1b7bf1f24729b5e01df7c633cec8a'
//   const pubkey =
//     '6e59d3b78b1c1490a6489c94405873b57d8ef398a830ae5e39608f4107e9a790'
//   const post = {
//     content: '#damus some content #bitcoin derp',
//     references: [],
//   }
//   const ev = post_to_event(post, privkey, pubkey)

//   expect(ev.tags.length).toBe(2)
//   expect(ev.content).toBe('#damus some content #bitcoin derp')
//   expect(ev.tags[0][0]).toBe('t')
//   expect(ev.tags[0][1]).toBe('damus')
//   expect(ev.tags[1][0]).toBe('t')
//   expect(ev.tags[1][1]).toBe('bitcoin')
// })

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
