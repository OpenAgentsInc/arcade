import { useAuthed } from 'app/lib/hooks/useAuthed'
import { AuthedNavigator } from './authed-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export function NativeNavigation() {
  const authed = useAuthed()
  return authed ? <AuthedNavigator /> : <UnauthedNavigator />
}
