import { PostBlock } from '../postblock'
import { Block, Mention, PostTags } from '../types'
import { findTagRef, parseMentionType, refidToTag } from './mentions'

/**
 * This function takes in an array of PostBlock objects and an array of tags and returns an object
 * containing an array of Block objects and an array of tags.
 *
 * @param postBlocks An array of PostBlock objects
 * @param tags An array of tags
 * @returns An object containing an array of Block objects and an array of tags
 */
export function makePostTags(
  postBlocks: PostBlock[],
  tags: string[][]
): PostTags {
  // Create a copy of the tags array
  const newTags = tags.slice()
  // Create an empty array to store the Block objects
  const blocks: Block[] = []

  // Iterate through the postBlocks array
  for (const postBlock of postBlocks) {
    // console.log the postBlock.type
    console.log(postBlock.type)

    // Check the type of the postBlock
    switch (postBlock.type) {
      // If the type is 'ref'
      case 'ref': {
        // Extract the ReferencedId object from the postBlock
        const ref = postBlock.value
        // Parse the mention type from the key of the ReferencedId object
        const mentionType = parseMentionType(ref.key)
        // If the mention type is valid
        if (mentionType) {
          // Find the index of the tag in the tags array
          const ind = findTagRef(mentionType, ref.refId, tags)
          // If the tag is found in the tags array
          if (ind && ind >= 0) {
            // Create a Mention object
            const mention: Mention = {
              index: ind,
              type: mentionType,
              ref,
            }
            // Create a Block object
            const block: Block = {
              kind: 'mention',
              mention,
            }
            // Push the Block object to the blocks array
            blocks.push(block)
          } else {
            // Get the index of the new tag
            const ind = newTags.length
            // Create a new tag from the refId
            newTags.push(refidToTag(ref.refId))
            // Create a Mention object
            const mention: Mention = {
              index: ind,
              type: mentionType,
              ref,
            }
            // Create a Block object
            const block: Block = {
              kind: 'mention',
              mention,
            }
            // Push the Block object to the blocks array
            blocks.push(block)
          }
        }
        break
      }
      // If the type is 'hashtag'
      case 'hashtag': {
        // Extract the hashtag from the postBlock
        const hashtag = postBlock.value.toLowerCase()
        // Check if the tag exists in the tags array
        const tagExists = tags.some(
          (tag) => tag[0] === 't' && tag[1] === hashtag
        )
        // Create a Block object for the hashtag
        const block: Block = {
          kind: 'hashtag',
          hashtag,
        }
        // Push the Block object to the blocks array
        blocks.push(block)
        // If the tag does not exist
        if (!tagExists) {
          // Push the tag to the newTags array
          newTags.push(['t', hashtag])
        }
        break
      }
      // If the type is 'text'
      case 'text': {
        // Create a Block object
        const block: Block = {
          kind: 'text',
          text: postBlock.value,
        }
        // Push the Block object to the blocks array
        blocks.push(block)
        break
      }
    }
  }
  // Return an object containing the blocks array and the newTags array
  return {
    blocks,
    tags: newTags,
  }
}
