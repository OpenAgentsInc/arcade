import { parseMentions } from 'app/lib/models/mentions/parseMentions'

test('parses mention with markdown', () => {
  const md = `
          Testing markdown in arc

          **bold**

          _italics_

          \`monospace\`

          # h1

          ## h2

          ### h3

          * list1
          * list2

          > some awesome quote

          [my website](https://thearcapp.com)
    `

  const parsed = parseMentions(md, [])

  expect(parsed).not.toBeNull()
  expect(parsed.length).toBe(1)
  expect(typeof parsed[0]).toBe('object')
  expect(parsed[0].is_text).toBeDefined()
})
