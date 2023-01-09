export type ReferencedId = {
  refId: string
  relayId: string | null
  key: string
}

export type PostBlock =
  | { type: 'text'; value: string }
  | { type: 'ref'; value: ReferencedId }
  | { type: 'hashtag'; value: string }

export const parsePostTextBlock = (
  str: string,
  from: number,
  to: number
): PostBlock => {
  return { type: 'text', value: str.substring(from, to) }
}
