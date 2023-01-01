// Web equivalent of our NativeNavigator re checking auth status
import { useAuthed } from 'app/lib/hooks/useAuthed'

export const WebAuthProvider = ({ children }) => {
  const authed = useAuthed()

  // If unauthed and NextJS path is not /, redirect to /
  if (typeof window !== 'undefined' && !authed && window.location.pathname !== '/') {
    window.location.pathname = '/'
  }

  return children
}
