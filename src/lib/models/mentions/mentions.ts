import { NostrEvent } from '../../nostr/NostrEvent'
import { parsePostBlocks } from '../post'
import { Block, MentionType } from '../types'
import { makePostTags } from './makePostTags'

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
  const tags = post.references.map(refidToTag)
  const postBlocks = parsePostBlocks(post.content)
  console.log('postBlocks:', postBlocks)
  const postTags = makePostTags(postBlocks, tags)
  console.log('postTags:', postTags)
  const content = renderBlocks(postTags.blocks)
  const newEv = new NostrEvent(content, pubkey, post.kind, postTags.tags)
  newEv.calculateId()
  newEv.sign(privkey)
  return newEv
}

export const parseMentions = (content: string, tags: any[]) => {
  // If the content is blank, return an empty array.
  if (!content) {
    return []
  }

  // Create an empty array to store the parsed strings.
  const out: any[] = []

  // Set the start and end indices of the content.
  let start = 0
  //   const end = content.length

  // Use a regular expression to match and extract hashtags from the content string.
  const hashtagRegex = /#\w+/g
  let hashtagMatch
  while ((hashtagMatch = hashtagRegex.exec(content)) !== null) {
    // Extract the hashtag from the match.
    const hashtag = hashtagMatch[0]
    // Get the index of the start of the hashtag.
    const hashtagStart = hashtagMatch.index
    // Get the index of the end of the hashtag.
    const hashtagEnd = hashtagStart + hashtag.length
    // If the hashtag start index is after the current start index, add the substring between the start index and the hashtag start index to the output array.
    if (hashtagStart > start) {
      out.push(content.substring(start, hashtagStart))
    }
    // Add the hashtag to the output array, minus the hashtag itself.
    out.push(hashtag.substring(1))
    // Update the start index to the index of the end of the hashtag.
    start = hashtagEnd
  }

  // Use a regular expression to match and extract URLs from the content string.
  const urlRegex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  let urlMatch
  while ((urlMatch = urlRegex.exec(content)) !== null) {
    // Extract the URL from the match.
    const url = urlMatch[0]
    // Get the index of the start of the URL.
    const urlStart = urlMatch.index
    // Get the index of the end of the URL.
    const urlEnd = urlStart + url.length
    // If the URL start index is after the current start index, add the substring between the start index and the URL start index to the output array.
    if (urlStart > start) {
      out.push(content.substring(start, urlStart))
    }
    // Add the URL to the output array.
    out.push(url)
    // Update the start index to the index of the end of the URL.
    start = urlEnd
  }

  // Use a regular expression to match and extract Lightning Network invoices from the content string.
  const invoiceRegex = /ln[bc]\w+/g
  let invoiceMatch
  while ((invoiceMatch = invoiceRegex.exec(content)) !== null) {
    // Extract the invoice from the match.
    const invoice = invoiceMatch[0]
    // Get the index of the start of the invoice.
    const invoiceStart = invoiceMatch.index
    // Get the index of the end of the invoice.
    const invoiceEnd = invoiceStart + invoice.length
    // If the invoice start index is after the current start index, add the substring between the start index and the invoice start index to the output array.
    if (invoiceStart > start) {
      out.push(content.substring(start, invoiceStart))
    }
    // Add the invoice to the output array.
    out.push(invoice)
    // Update the start index to the index of the end of the invoice.
    start = invoiceEnd
  }

  // If there is any content remaining after parsing the mentions, add it to the output array.
  if (start < content.length) {
    out.push(content.substring(start))
  }

  return out
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
