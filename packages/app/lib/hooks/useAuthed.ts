import { useStore } from 'app/stores'

export const useAuthed = () => {
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const authed = privateKey.length > 10 && publicKey.length > 10 // TODO: Sophisticate this
  return authed
}
