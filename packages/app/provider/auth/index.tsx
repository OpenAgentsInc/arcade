import { useEffect } from 'react'
import { useAuthed } from 'app/lib/hooks'
import { useRouter } from 'solito/router'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authed = useAuthed()
  const { replace } = useRouter()

  useEffect(() => {
    if (authed) {
      console.log('authed - redirecting (skipped)')
      //   replace('/user/testo')
    } else {
      console.log('authed:', authed)
    }
  }, [authed])

  return <>{children}</>
}
