import { useGlobalFeed } from './useGlobalFeed'

export const useUserPosts = (pubkey: string) => {
  const posts = useGlobalFeed().filter((post) => post.pubkey === pubkey)
  return posts
}
