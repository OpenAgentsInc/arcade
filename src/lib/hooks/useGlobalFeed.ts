import { useStore } from 'app/stores'

export const useGlobalFeed = () => {
  const notes = useStore((state) => state.notes).sort(
    (a, b) => b.created_at - a.created_at
  )
  return notes
}
