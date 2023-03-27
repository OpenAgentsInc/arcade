import { useEffect } from 'react'
import { useAuthed } from 'app/lib/hooks'
import { useRouter } from 'solito/router'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authed = useAuthed()
  const { replace } = useRouter()

  useEffect(() => {
    if (authed) {
      replace('/home/chat')
    } else {
      replace('/', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true,
        },
      })
    }
  }, [authed])

  return <>{children}</>
}
