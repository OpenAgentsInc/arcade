import { NostrEvent } from 'app/lib/nostr/NostrEvent'

import { NostrPost } from '../types'

// Extract hashtags from post content and add them to the tags array
export function extractHashtags(postContent: string): string[] {
  const hashtagRegex = /#(\w+)/g
  const hashtags = []

  let match: any
  while ((match = hashtagRegex.exec(postContent)) !== null) {
    hashtags.push(match[1])
  }

  return hashtags
}

export const postToEvent = (
  post: NostrPost,
  privkey: string,
  pubkey: string
) => {
  const tags = extractHashtags(post.content)
  console.log('tags:', tags)
  const newEv = new NostrEvent(post.content, pubkey, post.kind, tags)
  newEv.calculateId()
  newEv.sign(privkey)
  return newEv
}
