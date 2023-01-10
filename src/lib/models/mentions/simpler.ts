import { Block, Kind, NostrEvent, NostrPost } from '../types'

export function postToEvent(
  post: NostrPost,
  privkey: string,
  pubkey: string
): NostrEvent {
  const eventId = generateEventId(privkey, pubkey)
  const timestamp = new Date()
  const { content, references } = post
  const tags = extractTagsFromContent(content)
  const blocks = extractBlocksFromContent(content)

  return new NostrEvent(
    eventId,
    Kind.Text,
    timestamp,
    content,
    tags,
    blocks,
    references
  )
}

function extractTagsFromContent(content: string): string[][] {
  const tags: string[][] = []
  const regex = /#(\w+)/g

  let match
  while ((match = regex.exec(content))) {
    tags.push(['t', match[1]])
  }

  return tags
}

function extractBlocksFromContent(content: string): Block[] {
  const blocks: Block[] = []

  const tags = extractTagsFromContent(content)
  let currentIndex = 0
  for (const tag of tags) {
    const tagIndex = content.indexOf(tag[1], currentIndex)
    if (tagIndex > currentIndex) {
      blocks.push({
        kind: 'text',
        text: content.substring(currentIndex, tagIndex),
      })
    }
    blocks.push({ kind: 'hashtag', hashtag: tag[1] })
    currentIndex = tagIndex + tag[1].length + 1
  }

  if (currentIndex < content.length) {
    blocks.push({ kind: 'text', text: content.substring(currentIndex) })
  }

  return blocks
}

function generateEventId(privkey: string, pubkey: string): string {
  // This is just a placeholder function that returns a fixed event id.
  // In a real implementation, you would generate the event id using the privkey and pubkey.
  return 'dummy-event-id'
}
