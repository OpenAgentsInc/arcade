import { useStore } from 'app/stores'

export const useGlobalFeed = () => {
  const notes = useStore((state) => state.notes)
  return notes
}
