// Web equivalent of our NativeNavigator re checking auth status
import { useAuthed } from 'app/features/user'

export const WebAuthProvider = ({ children }) => {
  // Set authed to useAuthed() if client side, empty hook if server side
  const authed = typeof window !== 'undefined' ? useAuthed() : []

  // Don't redirect if on /, /login, or /create
  const nonRedirectPaths = ['/', '/login', '/create']

  // If unauthed and NextJS path is not a nonRedirectPaths, redirect to /
  if (
    typeof window !== 'undefined' &&
    authed === false &&
    !nonRedirectPaths.includes(window.location.pathname)
  ) {
    window.location.pathname = '/'
  }

  // If authed and NextJS path is /, redirect to /channels
  if (typeof window !== 'undefined' && authed === true && window.location.pathname === '/') {
    window.location.pathname = '/channels'
  }

  return children
}
