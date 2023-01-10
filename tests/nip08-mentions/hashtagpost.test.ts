import { postToEvent } from 'lib/nostr/experimental/mentions/simpler'
import { PostKind } from 'lib/nostr/experimental/types'

test('make hashtag post', () => {
  const privkey =
    'd05f5fcceef3e4529703f62a29222d6ee2d1b7bf1f24729b5e01df7c633cec8a'
  const pubkey =
    '6e59d3b78b1c1490a6489c94405873b57d8ef398a830ae5e39608f4107e9a790'
  const post = {
    content: '#arc some content #bitcoin derp',
    references: [],
    kind: PostKind.TextPost,
  }
  const ev = postToEvent(post, privkey, pubkey)

  expect(ev.tags.length).toBe(2)
  expect(ev.content).toBe('#arc some content #bitcoin derp')
  expect(ev.tags[0][0]).toBe('t')
  expect(ev.tags[0][1]).toBe('arc')
  expect(ev.tags[1][0]).toBe('t')
  expect(ev.tags[1][1]).toBe('bitcoin')
})
