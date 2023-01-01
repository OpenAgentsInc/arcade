import { useStore } from 'app/stores'
import { AuthedNavigator } from './authed-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export function NativeNavigation() {
  // Return AuthedNavigator or UnauthedNavigator depending on user.isAuthed

  const user = useStore((s) => s.user)
  const authed = user.privateKey.length > 10 && user.publicKey.length > 10

  console.log('user', user)
  console.log('authed:', authed)

  return authed ? <AuthedNavigator /> : <UnauthedNavigator />
}
