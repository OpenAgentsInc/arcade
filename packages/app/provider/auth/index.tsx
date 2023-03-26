import { useAuthed } from 'app/lib/hooks'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authed = useAuthed()
  console.log('authed', authed)
  return <>{children}</>
}
