// Web equivalent of our NativeNavigator re checking auth status
import { useAuthed } from 'app/lib/hooks/useAuthed'

export const WebAuthProvider = ({ children }) => {
  // Set authed to useAuthed() if client side, empty hook if server side
  const authed = typeof window !== 'undefined' ? useAuthed() : []

  // If unauthed and NextJS path is not /, redirect to /
  if (typeof window !== 'undefined' && authed === false && window.location.pathname !== '/') {
    window.location.pathname = '/'
  }

  // If authed and NextJS path is /, redirect to /channels
  if (typeof window !== 'undefined' && authed === true && window.location.pathname === '/') {
    window.location.pathname = '/channels'
  }

  return children
}
