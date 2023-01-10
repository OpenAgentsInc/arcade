import { consumeUntil, Parser, peekChar, substring } from 'app/lib/util/parser'

import { NostrEvent } from '../../nostr/NostrEvent'
import { parsePostBlocks } from '../post'
import { Block, MentionType, NostrPost } from '../types'
import { makePostTags } from './makePostTags'
import { extractHashtags } from './simpler'

export function parseMentionType(p: string): MentionType | null {
  if (p[0] === '@') {
    return 'pubkey' as MentionType
  }

  if (p[0] === '&') {
    return 'event' as MentionType
  }

  return null
}

function renderBlocks(blocks: Block[]): string {
  return blocks.reduce((str, block) => {
    switch (block.kind) {
      case 'mention':
        return str + '#[' + block.index + ']'
      case 'text':
        return str + block.text
      case 'hashtag':
        return str + '#' + block.hashtag
      case 'url':
        return str + block.url
      case 'invoice':
        return str + block.invoice.string
    }
  }, '')
}

export const postToEvent = (
  post: NostrPost,
  privkey: string,
  pubkey: string
) => {
  //   const tags = post.references.map(refidToTag)
  //   const postBlocks = parsePostBlocks(post.content)
  //   console.log('postBlocks:', postBlocks)
  //   const postTags = makePostTags(postBlocks, tags)
  //   console.log('postTags:', postTags)
  //   const content = renderBlocks(postTags.blocks)
  const tags = extractHashtags(post.content)
  const newEv = new NostrEvent(post.content, pubkey, post.kind, tags)
  newEv.calculateId()
  newEv.sign(privkey)
  return newEv
}

/**
 *
The test failure is due to the fact that the parseMentions function is not correctly parsing hashtags. The parseMentions function is expecting an array of mentions as the second argument, but the test is passing in an empty array. This causes the function to not recognize the hashtag and return an incorrect result.

To fix this, we need to modify the parseMentions function to check for hashtags as well as mentions. We can do this by adding an additional 't' case to the switch statement within the parseMentions function. This case will handle hashtags and will parse them in the same way as mentions.
 */

// Modify parseMentions function to check for hashtags
export function parseMentions(
  content: string,
  mentions: [string, string][]
): (string | [string, string])[] {
  const p = new Parser(0, content)
  const result: (string | [string, string])[] = []
  while (!p.done()) {
    const c = peekChar(p, 0)
    if (c === undefined) {
      break
    }
    if (c === '@') {
      // Parse mentions
      if (consumeUntil(p, (c) => c === '@')) {
        const start = p.pos
        if (consumeUntil(p, (c) => c === ' ', true)) {
          const end = p.pos
          const mention = substring(p.str, start + 1, end)
          const foundMention = mentions.find((m) => m[1] === mention)
          if (foundMention) {
            result.push(foundMention)
          } else {
            result.push(mention)
          }
        }
      }
    } else if (c === '#') {
      // Parse hashtags
      if (consumeUntil(p, (c) => c === '#')) {
        const start = p.pos
        if (consumeUntil(p, (c) => c === ' ', true)) {
          const end = p.pos
          const hashtag = substring(p.str, start + 1, end)
          result.push(['t', hashtag])
        }
      }
    } else {
      // Parse plain text
      if (consumeUntil(p, (c) => c === '@' || c === '#')) {
        const end = p.pos
        result.push(substring(p.str, 0, end))
      }
    }
    p.pos += 1
  }
  return result
}

export function refidToTag(refid: string): string[] {
  return ['e', refid]
}

export function findTagRef(
  type: string,
  id: string,
  tags: string[][]
): number | null {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i]
    if (tag[0] === type && tag[1] === id) {
      return i
    }
  }
  return null
}

// import { NostrEvent } from '../nostr/NostrEvent'
// import { parsePostBlocks } from './post'
// import { PostBlock } from './postblock'

// type NostrPost = {
//   content: string
//   references: string[]
//   kind: PostKind
// }

// export enum PostKind {
//   TextPost = 1,
//   ImagePost = 2,
//   AudioPost = 3,
// }

// /**
//  * This function takes in an array of PostBlock objects and an array of tags and returns an object
//  * containing an array of Block objects and an array of tags.
//  *
//  * @param postBlocks An array of PostBlock objects
//  * @param tags An array of tags
//  * @returns An object containing an array of Block objects and an array of tags
//  */
// function makePostTags(postBlocks: PostBlock[], tags: string[][]): PostTags {
//   // Create a copy of the tags array
//   const newTags = tags.slice()
//   // Create an empty array to store the Block objects
//   const blocks: Block[] = []

//   // Iterate through the postBlocks array
//   for (const postBlock of postBlocks) {
//     // Check the type of the postBlock
//     switch (postBlock.type) {
//       // If the type is 'ref'
//       case 'ref': {
//         // Extract the ReferencedId object from the postBlock
//         const ref = postBlock.value
//         // Parse the mention type from the key of the ReferencedId object
//         const mentionType = parseMentionType(ref.key)
//         // If the mention type is valid
//         if (mentionType) {
//           // Find the index of the tag in the tags array
//           const ind = findTagRef(mentionType, ref.refId, tags)
//           // If the tag is found in the tags array
//           if (ind && ind >= 0) {
//             // Create a Mention object
//             const mention: Mention = {
//               index: ind,
//               type: mentionType,
//               ref,
//             }
//             // Create a Block object
//             const block: Block = {
//               kind: 'mention',
//               mention,
//             }
//             // Push the Block object to the blocks array
//             blocks.push(block)
//           } else {
//             // Get the index of the new tag
//             const ind = newTags.length
//             // Create a new tag from the refId
//             newTags.push(refidToTag(ref.refId))
//             // Create a Mention object
//             const mention: Mention = {
//               index: ind,
//               type: mentionType,
//               ref,
//             }
//             // Create a Block object
//             const block: Block = {
//               kind: 'mention',
//               mention,
//             }
//             // Push the Block object to the blocks array
//             blocks.push(block)
//           }
//         }
//         break
//       }
//       // If the type is 'hashtag'
//       case 'hashtag': {
//         // Extract the hashtag from the postBlock
//         const hashtag = postBlock.value.toLowerCase()
//         // Check if the tag exists in the tags array
//         const tagExists = tags.some(
//           (tag) => tag[0] === 't' && tag[1] === hashtag
//         )
//         // If the tag does not exist
//         if (!tagExists) {
//           // Push the tag to the newTags array
//           newTags.push(['t', hashtag])
//         }
//         // Create a Block object
//         const block: Block = {
//           kind: 'hashtag',
//           hashtag,
//         }
//         // Push the Block object to the blocks array
//         blocks.push(block)
//         break
//       }
//       // If the type is 'text'
//       case 'text': {
//         // Create a Block object
//         const block: Block = {
//           kind: 'text',
//           text: postBlock.value,
//         }
//         // Push the Block object to the blocks array
//         blocks.push(block)
//         break
//       }
//     }
//   }
//   // Return an object containing the blocks array and the newTags array
//   return {
//     blocks,
//     tags: newTags,
//   }
// }

/**
 * This function takes in a post object and returns a NostrEvent object.
 *
 * @param post A post object
 * @param privkey The private key of the user
 * @param pubkey The public key of the user
 * @returns A NostrEvent object
 */
// export function postToEvent(
//   post: NostrPost,
//   privkey: string,
//   pubkey: string
// ): NostrEvent {
//   // Parse the post blocks from the post content
//   const postBlocks = parsePostBlocks(post.content)
//   // Create an empty array to store the tags
//   const tags: string[][] = []
//   // Parse the mentions from the post references
//   //   const mentions = parseMentions(post.references, tags)
//   // Create an object containing the post blocks and the tags
//   const postTags = makePostTags(postBlocks, tags)
//   // Create a NostrEvent object
//   const ev = new NostrEvent(
//     post.kind,
//     postTags.blocks,
//     postTags.tags,
//     privkey,
//     pubkey
//   )
//   // Return the NostrEvent object
//   return ev
// }
