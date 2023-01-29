import { useStore } from 'stores'

export const useDirectMessages = () => {
  const messages = useStore((state) => state.dms)
  //   .filter(
  //     (message) => message.pubkey === pubkey // this only works for the current user - need to filter by both pubkeys
  //   )
  return messages
}
